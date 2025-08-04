import React from 'react'

const IDCardPreview = ({ userData, isPreview = false }) => {
  return (
    <div className="id-card-container">
      {userData?.profileImage && (
        <img
          src={userData.profileImage}
          alt="Preload"
          style={{ display: 'none' }}
          onError={(e) => console.error('Preload image error:', e)}
        />
      )}
      <div 
        id="id-card" 
        className="tiranga-id-card"
        style={{
          maxWidth: '600px',
          width: '90vw',
          height: 'auto',
          minHeight: '380px',
          background: 'linear-gradient(to bottom, #FF9933 0%, #FF9933 20%, #FFFFFF 20%, #FFFFFF 80%, #138808 80%, #138808 100%)',
          borderRadius: '15px',
          border: '4px solid #000080',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          margin: '0 auto',
          padding: '1rem',
          position: 'relative',
          display: 'block'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '2.5rem',
              height: '1.75rem',
              background: 'linear-gradient(45deg, #FF9933 0%, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%, #138808 100%)',
              borderRadius: '0.5rem',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
            }}>
              ✊
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#8B0000',
              margin: '0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'serif',
              letterSpacing: '1px'
            }}>
              मेरा भारत - मेरी पहचान
            </h1>
            <div style={{
              width: '2.5rem',
              height: '1.75rem',
              background: 'linear-gradient(45deg, #FF9933 0%, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%, #138808 100%)',
              borderRadius: '0.5rem',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
            }}>
              ✊
            </div>
          </div>
          <div style={{
            backgroundColor: '#000080',
            color: 'white',
            padding: '0.4rem 1.5rem',
            borderRadius: '1.25rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            display: 'inline-block',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            ID कार्ड
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1rem' }}>
          <div style={{ width: '60%', textAlign: 'left' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#000',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'baseline'
              }}>
                नाम:
                <span style={{
                  borderBottom: '3px solid #000',
                  paddingBottom: '0.15rem',
                  marginLeft: '0.75rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  minWidth: '12.5rem',
                  color: '#2c3e50'
                }}>
                  {userData?.name || '________________________'}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#000',
                marginBottom: '0.5rem'
              }}>
                पहचान संख्या:
              </div>
              <div style={{
                borderBottom: '3px solid #000',
                paddingBottom: '0.25rem',
                display: 'inline-block',
                minWidth: '9rem',
                textAlign: 'center'
              }}>
                <span style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#DC143C',
                  fontFamily: 'monospace',
                  letterSpacing: '3px'
                }}>
                  {userData?.tirangaId || '000000'}
                </span>
              </div>
            </div>
          </div>
          <div style={{ width: '35%', textAlign: 'center' }}>
            <div style={{
              width: '8rem',
              height: '8rem',
              border: '5px solid #FF6600',
              borderRadius: '50%',
              backgroundColor: 'white',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 15px rgba(0,0,0,0.2)'
            }}>
              {userData?.profileImage ? (
                <img 
                  src={userData.profileImage} 
                  alt="प्रोफाइल फोटो" 
                  crossOrigin="anonymous"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    display: 'block'
                  }}
                  onError={(e) => console.error('Profile image error:', e)}
                />
              ) : (
                <div style={{ textAlign: 'center', color: '#999', fontSize: '0.7rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>👤</div>
                  <div>फोटो</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'left',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#138808',
          fontStyle: 'italic',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          marginTop: '1rem'
        }}>
          जहाँ तिरंगा, वहीं मेरा अभिमान।
        </div>

        <div style={{
          textAlign: 'right',
          fontSize: '0.8rem',
          color: '#138808',
          fontWeight: 'bold',
          fontStyle: 'italic',
          marginTop: '0.5rem'
        }}>
          <div>Approved by</div>
          <div style={{ fontSize: '0.9rem', textDecoration: 'underline', marginTop: '0.1rem' }}>
            श्रीमान्
          </div>
        </div>
      </div>
    </div>
  )
}

export default IDCardPreview;