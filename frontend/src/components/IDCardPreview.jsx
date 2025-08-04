import React from 'react'
import QRCode from 'qrcode'

const IDCardPreview = ({ userData, qrCodeData, isPreview = false }) => {
  const [qrCode, setQrCode] = React.useState('')

  React.useEffect(() => {
    if (qrCodeData) {
      QRCode.toDataURL(qrCodeData, { 
        width: 120, 
        margin: 1,
        color: {
          dark: '#1E3A8A',
          light: '#FFFFFF'
        }
      })
        .then(url => setQrCode(url))
        .catch(err => console.error(err))
    }
  }, [qrCodeData])

  return (
    <div className="id-card-container">
      <div id="id-card" className="id-card">
        {/* Card Header with Government Branding */}
        <div className="id-card-header">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <img 
              src="/images/ashoka-chakra.png" 
              alt="अशोक चक्र" 
              className="me-2"
              style={{width: '24px', height: '24px'}}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'inline'
              }}
            />
            <span style={{display: 'none'}}>☸️</span>
            <h2 className="id-card-title mb-0">
              भारतीय पहचान पत्र
            </h2>
          </div>
          <div className="id-card-title" style={{fontSize: '0.85rem', fontWeight: '600'}}>
            TIRANGA IDENTITY CARD
          </div>
          <div 
            className="w-100 mt-2"
            style={{
              height: '3px',
              background: 'linear-gradient(90deg, var(--tiranga-saffron) 33%, var(--tiranga-white) 33% 66%, var(--tiranga-green) 66%)',
              borderRadius: '2px'
            }}
          ></div>
        </div>

        {/* Card Body */}
        <div className="id-card-body">
          <div className="id-card-user">
            {/* Profile Photo */}
            <div className="text-center">
              {userData?.profileImage ? (
                <img 
                  src={userData.profileImage} 
                  alt="प्रोफाइल फोटो" 
                  className="id-card-photo"
                />
              ) : (
                <div className="id-card-photo-placeholder">
                  <div className="text-center">
                    <i className="fas fa-user-circle" style={{fontSize: '2rem', color: '#9CA3AF'}}></i>
                    <div style={{fontSize: '0.7rem', marginTop: '4px'}}>फोटो</div>
                  </div>
                </div>
              )}
            </div>

            {/* User Information */}
            <div className="id-card-info flex-grow-1">
              <h3>{userData?.name || 'पूरा नाम | Full Name'}</h3>
              <div className="id-card-details">
                <p>
                  <strong>मोबाइल | Mobile:</strong> {userData?.mobile || 'XXXXXXXXXX'}
                </p>
                <p>
                  <strong>शहर | City:</strong> {userData?.city || 'शहर का नाम'}
                </p>
                <p>
                  <strong>रक्त समूह | Blood Group:</strong> {userData?.bloodGroup || 'O+'}
                </p>
                <p>
                  <strong>भूमिका | Role:</strong> {userData?.role || 'नागरिक | Citizen'}
                </p>
              </div>
            </div>
          </div>

          {/* ID Number and QR Code Section */}
          <div className="id-card-footer">
            <div className="id-card-id">
              <p className="id-card-id-label">पहचान संख्या | ID Number</p>
              <p className="id-card-id-number">
                {userData?.tirangaId || 'TIR-XXXX-XXXX'}
              </p>
            </div>
            {qrCode && (
              <div className="text-center">
                <img src={qrCode} alt="QR Code" className="id-card-qr" />
                <div style={{fontSize: '0.6rem', color: '#6B7280', marginTop: '2px'}}>
                  सत्यापन | Verify
                </div>
              </div>
            )}
          </div>

          {/* Government Disclaimer */}
          <div className="text-center mt-3 pt-2" style={{borderTop: '1px solid #E5E7EB'}}>
            <p className="mb-0" style={{fontSize: '0.65rem', color: '#6B7280', lineHeight: '1.2'}}>
              यह व्यक्तिगत उपयोग के लिए डिजिटल पहचान पत्र है<br/>
              <em>This is a digital identity card for personal use only</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IDCardPreview
