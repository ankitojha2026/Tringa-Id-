<?php
// CORS Pre-flight Handler
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 3600');
    http_response_code(200);
    exit(0);
}

// Regular CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

require_once '../config/database.php';

/**
 * Sanitize user input
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate Indian mobile number
 */
function validateMobileNumber($mobile) {
    return preg_match('/^[6-9][0-9]{9}$/', $mobile);
}

// Main execution
try {
    // Check request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }

    // Handle JSON or form-data input
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if (stripos($contentType, 'application/json') !== false) {
        $rawData = json_decode(file_get_contents("php://input"), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON payload');
        }
    } else {
        $rawData = $_POST;
    }

    // Log incoming data for debugging
    file_put_contents('debug.log', print_r($rawData, true) . "\n", FILE_APPEND);

    // Validate required fields
    $requiredFields = ['name', 'mobile'];
    foreach ($requiredFields as $field) {
        if (empty($rawData[$field])) {
            throw new Exception("$field is required");
        }
    }

    // Sanitize and validate inputs
    $name = sanitizeInput($rawData['name']);
    $mobile = sanitizeInput($rawData['mobile']);
    $city = sanitizeInput($rawData['city'] ?? '');
    $bloodGroup = sanitizeInput($rawData['bloodGroup'] ?? 'O+');
    $role = sanitizeInput($rawData['role'] ?? 'नागरिक | Citizen');

    // Validate inputs
    if (strlen($name) < 2 || strlen($name) > 100) {
        throw new Exception('Name must be between 2 and 100 characters');
    }

    if (!validateMobileNumber($mobile)) {
        throw new Exception('Invalid mobile number format. Please enter a valid 10-digit Indian mobile number.');
    }

    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception('Database connection failed');
    }

    // Check if mobile number already exists
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM users WHERE mobile = ?");
    $stmt->execute([$mobile]);
    if ($stmt->fetch(PDO::FETCH_ASSOC)['count'] > 0) {
        throw new Exception('This mobile number is already registered.');
    }

    // Begin transaction
    $db->beginTransaction();

    try {
        // Insert data WITHOUT profile_image field
        $stmt = $db->prepare("
            INSERT INTO users (name, mobile, city, blood_group, role, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        ");

        $stmt->execute([
            $name,
            $mobile,
            $city,
            $bloodGroup,
            $role
        ]);

        // Get the inserted record's primary key ID
        $primaryId = $db->lastInsertId();

        // Generate Tiranga ID from primary key - ONLY NUMBERS with leading zeros
        $tirangaId = str_pad($primaryId, 6, '0', STR_PAD_LEFT);

        // Update the record with generated Tiranga ID
        $updateStmt = $db->prepare("UPDATE users SET tiranga_id = ? WHERE id = ?");
        $updateStmt->execute([$tirangaId, $primaryId]);

        // Commit transaction
        $db->commit();

        // Success response - name and tiranga_id only
        echo json_encode([
            'success' => true,
            'data' => [
                'name' => $name,
                'tiranga_id' => $tirangaId
            ]
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        // Rollback transaction
        $db->rollback();
        throw $e;
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
} finally {
    // Close database connection
    if (isset($database)) {
        $database->closeConnection();
    }
}
?>