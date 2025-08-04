# 🇮🇳 तिरंगा पहचान पत्र जनरेटर | Tiranga ID Card Generator

एक आधुनिक, सुरक्षित और professional सरकारी स्टाइल वेब एप्लिकेशन व्यक्तिगत तिरंगा ID कार्ड बनाने के लिए।

A modern, secure, and professional government-style web application for generating personalized Tiranga ID cards.

## ✨ मुख्य विशेषताएं | Key Features

- 🏛️ **सरकारी स्टाइल UI** - Professional government website design
- 📱 **Responsive डिज़ाइन** - Mobile-first approach with Bootstrap
- 🖼️ **Advanced Image Cropping** - WhatsApp-style circular cropping with zoom
- 🆔 **Unique Tiranga ID** - Auto-generated unique identification numbers
- 📱 **QR Code Integration** - Verification QR codes with each ID
- ⬇️ **High-Quality Download** - Download ID as PNG with 3x resolution
- 📤 **WhatsApp Sharing** - Direct share functionality
- 🔒 **Secure Backend** - PHP with MySQL, input validation & sanitization
- 🇮🇳 **Bilingual Support** - Hindi and English content
- 🎨 **Tiranga Colors** - Authentic Indian flag colors throughout

## 🚀 Quick Setup | त्वरित सेटअप

### Prerequisites | आवश्यकताएं

- Node.js (v16+)
- PHP (v7.4+)
- MySQL (v5.7+)
- Composer

### Frontend Setup | फ्रंटएंड सेटअप


Server runs on: `http://localhost:3000`

### Backend Setup | बैकएंड सेटअप

1. **Install Dependencies:**


2. **Database Setup:**

3. **Configure Database:**
Edit `backend/config/database.php` with your credentials

4. **Start PHP Server:**

### Required Images | आवश्यक इमेज

निम्नलिखित images को `public/images/` folder में रखें:

- `india-emblem.png` - भारत सरकार का चिह्न
- `ashoka-chakra.png` - अशोक चक्र
- `id-card-template.png` - ID Card background template
- `government-seal.png` - सरकारी मुहर

## 🎨 Government Design Features

### Color Scheme | रंग योजना
- **Saffron**: `#FF9933` (तिरंगे का केसरिया)
- **White**: `#FFFFFF` (तिरंगे का सफेद)
- **Green**: `#138808` (तिरंगे का हरा)
- **Navy Blue**: `#000080` (सरकारी नीला)
- **Ashoka Blue**: `#0066CC` (अशोक चक्र नीला)

### Typography | टाइपोग्राफी
- **Primary**: Inter (English text)
- **Hindi**: Noto Sans Devanagari
- **Weights**: 300, 400, 500, 600, 700, 800

### UI Elements
- Government-style cards with official borders
- Professional form styling
- Tiranga color gradients
- Official government notices
- Bilingual content support

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive Bootstrap grid
- Optimized image cropping for mobile
- Government-style mobile navigation
- Fast loading with optimized assets

## 🔐 Security Features

- **Input Sanitization**: All user inputs sanitized
- **SQL Injection Prevention**: Prepared statements
- **File Upload Security**: Type and size validation
- **XSS Protection**: Output encoding
- **Secure File Naming**: Unique filename generation
- **Image Validation**: Proper image verification

## 📊 Database Schema


### Required Images | आवश्यक इमेज

निम्नलिखित images को `public/images/` folder में रखें:

- `india-emblem.png` - भारत सरकार का चिह्न
- `ashoka-chakra.png` - अशोक चक्र
- `id-card-template.png` - ID Card background template
- `government-seal.png` - सरकारी मुहर

## 🎨 Government Design Features

### Color Scheme | रंग योजना
- **Saffron**: `#FF9933` (तिरंगे का केसरिया)
- **White**: `#FFFFFF` (तिरंगे का सफेद)
- **Green**: `#138808` (तिरंगे का हरा)
- **Navy Blue**: `#000080` (सरकारी नीला)
- **Ashoka Blue**: `#0066CC` (अशोक चक्र नीला)

### Typography | टाइपोग्राफी
- **Primary**: Inter (English text)
- **Hindi**: Noto Sans Devanagari
- **Weights**: 300, 400, 500, 600, 700, 800

### UI Elements
- Government-style cards with official borders
- Professional form styling
- Tiranga color gradients
- Official government notices
- Bilingual content support

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive Bootstrap grid
- Optimized image cropping for mobile
- Government-style mobile navigation
- Fast loading with optimized assets

## 🔐 Security Features

- **Input Sanitization**: All user inputs sanitized
- **SQL Injection Prevention**: Prepared statements
- **File Upload Security**: Type and size validation
- **XSS Protection**: Output encoding
- **Secure File Naming**: Unique filename generation
- **Image Validation**: Proper image verification

## 📊 Database Schema


### Required Images | आवश्यक इमेज

निम्नलिखित images को `public/images/` folder में रखें:

- `india-emblem.png` - भारत सरकार का चिह्न
- `ashoka-chakra.png` - अशोक चक्र
- `id-card-template.png` - ID Card background template
- `government-seal.png` - सरकारी मुहर

## 🎨 Government Design Features

### Color Scheme | रंग योजना
- **Saffron**: `#FF9933` (तिरंगे का केसरिया)
- **White**: `#FFFFFF` (तिरंगे का सफेद)
- **Green**: `#138808` (तिरंगे का हरा)
- **Navy Blue**: `#000080` (सरकारी नीला)
- **Ashoka Blue**: `#0066CC` (अशोक चक्र नीला)

### Typography | टाइपोग्राफी
- **Primary**: Inter (English text)
- **Hindi**: Noto Sans Devanagari
- **Weights**: 300, 400, 500, 600, 700, 800

### UI Elements
- Government-style cards with official borders
- Professional form styling
- Tiranga color gradients
- Official government notices
- Bilingual content support

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive Bootstrap grid
- Optimized image cropping for mobile
- Government-style mobile navigation
- Fast loading with optimized assets

## 🔐 Security Features

- **Input Sanitization**: All user inputs sanitized
- **SQL Injection Prevention**: Prepared statements
- **File Upload Security**: Type and size validation
- **XSS Protection**: Output encoding
- **Secure File Naming**: Unique filename generation
- **Image Validation**: Proper image verification

## 📊 Database Schema

users (
id: INT AUTO_INCREMENT PRIMARY KEY,
name: VARCHAR(255) NOT NULL,
mobile: VARCHAR(15) NOT NULL,
city: VARCHAR(100),
blood_group: VARCHAR(5),
role: VARCHAR(100),
profile_image: VARCHAR(255),
tiranga_id: VARCHAR(20) UNIQUE,
qr_code: VARCHAR(255),
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

text

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

## 📦 Dependencies

### Frontend
- React 18.2.0
- Bootstrap 5.3.2
- React Easy Crop
- HTML2Canvas
- Axios
- QRCode.js

### Backend
- PHP 7.4+
- MySQL 5.7+
- Endroid QR Code

## 🎯 Usage Instructions

1. **Fill Form**: Enter your details (Name, Mobile, City, etc.)
2. **Upload Photo**: Choose and crop your profile picture
3. **Generate ID**: Click generate button
4. **Download/Share**: Download PNG or share on WhatsApp

## ⚠️ Important Disclaimer | महत्वपूर्ण अस्वीकरण

**यह एक व्यक्तिगत/शैक्षणिक परियोजना है।** जेनरेट किए गए ID कार्ड केवल व्यक्तिगत उपयोग के लिए हैं और कोई आधिकारिक सरकारी दस्तावेज नहीं हैं।

**This is a personal/educational project.** Generated ID cards are for personal use only and are NOT official government documents.

## 📄 License

This project is for educational purposes only. Not affiliated with any government organization.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

<div align="center">

**🇮🇳 भारत के लिए गर्व के साथ बनाया गया | Made with Pride for India 🇮🇳**
