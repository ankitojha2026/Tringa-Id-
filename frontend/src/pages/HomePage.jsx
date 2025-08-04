import React, { useState } from 'react'
import ImageCropper from '../components/ImageCropper'
import IDCardPreview from '../components/IDCardPreview'
import html2canvas from 'html2canvas'
import axios from 'axios'

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    bloodGroup: 'O+',
    role: 'नागरिक | Citizen'
  })
  const [imageFile, setImageFile] = useState(null)
  const [imageSrc, setImageSrc] = useState('')
  const [showCropper, setShowCropper] = useState(false)
  const [croppedImage, setCroppedImage] = useState('')
  const [generatedCard, setGeneratedCard] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 5 * 1024 * 1024) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setImageFile(file)
        const reader = new FileReader()
        reader.onload = () => {
          setImageSrc(reader.result)
          setShowCropper(true)
        }
        reader.readAsDataURL(file)
      } else {
        alert('कृपया केवल JPEG या PNG इमेज अपलोड करें | Please upload only JPEG or PNG images')
      }
    } else {
      alert('कृपया 5MB से छोटी इमेज अपलोड करें | Please upload an image smaller than 5MB')
    }
  }

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', error => reject(error))
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
    })

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.8)
    })
  }

  const onCropComplete = async (croppedAreaPixels) => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob)
      setCroppedImage(croppedImageUrl)
      setShowCropper(false)
    } catch (error) {
      console.error('Error cropping image:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!croppedImage) {
      alert('कृपया प्रोफाइल इमेज अपलोड और क्रॉप करें | Please upload and crop a profile image')
      return
    }

    setIsLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('mobile', formData.mobile)
      formDataToSend.append('city', formData.city)
      formDataToSend.append('bloodGroup', formData.bloodGroup)
      formDataToSend.append('role', formData.role)
      
      const response = await fetch(croppedImage)
      const blob = await response.blob()
      formDataToSend.append('profileImage', blob, 'profile.jpg')

      const apiResponse = await axios.post('http://localhost:8000/api/generate-id.php', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (apiResponse.data.success) {
        setGeneratedCard({
          ...formData,
          profileImage: croppedImage,
          tirangaId: apiResponse.data.tirangaId,
          qrCodeData: apiResponse.data.qrCodeData
        })
      } else {
        alert('ID जनरेट करने में त्रुटि | Error generating ID: ' + apiResponse.data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('ID कार्ड जनरेट करने में त्रुटि | Error generating ID card')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCard = async () => {
    const cardElement = document.getElementById('id-card')
    if (cardElement) {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true,
        allowTaint: true
      })
      
      const link = document.createElement('a')
      link.download = `tiranga-id-${generatedCard.tirangaId}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    }
  }

  const shareOnWhatsApp = async () => {
    const message = `🇮🇳 मेरा तिरंगा ID कार्ड देखें | Check out my Tiranga ID Card!
    
नाम | Name: ${generatedCard.name}
ID संख्या | ID Number: ${generatedCard.tirangaId}
    
यह भारत के लिए गर्व का क्षण है! 
#TirangaID #DigitalIndia #ProudIndian`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="container py-5">
      {!generatedCard ? (
        <>
          {/* Government Notice */}
          <div className="govt-notice mb-4 fade-in">
            <div className="govt-notice-icon">🏛️</div>
            <p className="govt-notice-text">
              <strong>सरकारी सूचना | Government Notice:</strong> यह एक व्यक्तिगत/शैक्षणिक परियोजना है। 
              This is a personal/educational project for digital identity creation.
            </p>
          </div>

          <div className="row g-4">
            {/* Form Section */}
            <div className="col-lg-6">
              <div className="govt-card slide-up">
                <div className="govt-card-header">
                  <h2 className="mb-0 text-white fw-bold">
                    <i className="fas fa-id-card me-2"></i>
                    अपना तिरंगा ID बनाएं
                  </h2>
                  <small className="text-white-50 d-block mt-1">
                    Create Your Tiranga Identity Card
                  </small>
                </div>
                
                <div className="p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="govt-form-group">
                      <label className="govt-label">
                        <i className="fas fa-user me-2"></i>
                        पूरा नाम | Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="govt-input"
                        placeholder="अपना पूरा नाम दर्ज करें | Enter your full name"
                      />
                    </div>

                    <div className="govt-form-group">
                      <label className="govt-label">
                        <i className="fas fa-mobile-alt me-2"></i>
                        मोबाइल नंबर | Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                        className="govt-input"
                        placeholder="10 अंकों का मोबाइल नंबर | Enter 10-digit mobile number"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="govt-form-group">
                          <label className="govt-label">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            शहर | City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="govt-input"
                            placeholder="आपका शहर | Your city"
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="govt-form-group">
                          <label className="govt-label">
                            <i className="fas fa-tint me-2"></i>
                            रक्त समूह | Blood Group
                          </label>
                          <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            className="govt-select"
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="govt-form-group">
                      <label className="govt-label">
                        <i className="fas fa-briefcase me-2"></i>
                        भूमिका | Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="govt-input"
                        placeholder="उदा: छात्र, पेशेवर | e.g., Student, Professional"
                      />
                    </div>

                    <div className="govt-form-group">
                      <label className="govt-label">
                        <i className="fas fa-camera me-2"></i>
                        प्रोफाइल फोटो | Profile Photo *
                      </label>
                      <div 
                        className={`govt-upload-area ${croppedImage ? 'active' : ''}`}
                        onClick={() => document.getElementById('image-upload').click()}
                      >
                        {croppedImage ? (
                          <div className="text-center">
                            <img 
                              src={croppedImage} 
                              alt="Cropped Profile" 
                              className="rounded-circle mb-3"
                              style={{width: '80px', height: '80px', objectFit: 'cover'}}
                            />
                            <p className="mb-2 fw-semibold text-success">
                              <i className="fas fa-check-circle me-2"></i>
                              फोटो अपलोड हो गई | Photo Uploaded Successfully
                            </p>
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                document.getElementById('image-upload').click()
                              }}
                            >
                              फोटो बदलें | Change Photo
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <i className="fas fa-cloud-upload-alt text-primary mb-3" style={{fontSize: '3rem'}}></i>
                            <h5 className="text-primary mb-2">अपनी प्रोफाइल फोटो अपलोड करें</h5>
                            <p className="mb-2 text-muted">Click to upload your profile photo</p>
                            <small className="text-muted">
                              अधिकतम 5MB, केवल JPG या PNG | Max 5MB, JPG or PNG only
                            </small>
                          </div>
                        )}
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={handleImageUpload}
                          className="d-none"
                        />
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="govt-btn govt-btn-primary py-3"
                        style={{fontSize: '1.1rem'}}
                      >
                        {isLoading ? (
                          <>
                            <div className="govt-spinner me-2" style={{width: '20px', height: '20px'}}></div>
                            कार्ड बनाया जा रहा है... | Generating Card...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-id-card me-2"></i>
                            तिरंगा ID जनरेट करें | Generate Tiranga ID
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="col-lg-6">
              <div className="govt-card slide-up">
                <div className="govt-card-header">
                  <h2 className="mb-0 text-white fw-bold">
                    <i className="fas fa-eye me-2"></i>
                    लाइव प्रीव्यू | Live Preview
                  </h2>
                  <small className="text-white-50 d-block mt-1">
                    See how your ID card will look
                  </small>
                </div>
                <div className="p-4">
                  <IDCardPreview 
                    userData={{
                      ...formData,
                      profileImage: croppedImage
                    }}
                    isPreview={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Generated Card Display
        <div className="text-center fade-in">
          <div className="govt-success-container slide-up">
            <div className="govt-success-icon">🎉</div>
            <h1 className="govt-success-title">
              बधाई हो! | Congratulations!
            </h1>
            <p className="govt-success-subtitle">
              आपका तिरंगा ID कार्ड तैयार है | Your Tiranga ID Card is Ready!
            </p>
          </div>
          
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6">
              <IDCardPreview 
                userData={generatedCard}
                qrCodeData={generatedCard.qrCodeData}
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                <button
                  onClick={downloadCard}
                  className="btn govt-btn-info px-4 py-3"
                  style={{fontSize: '1.1rem'}}
                >
                  <i className="fas fa-download me-2"></i>
                  ID कार्ड डाउनलोड करें | Download ID Card
                </button>
                
                <button
                  onClick={shareOnWhatsApp}
                  className="btn govt-btn-success px-4 py-3"
                  style={{fontSize: '1.1rem'}}
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  WhatsApp पर शेयर करें | Share on WhatsApp
                </button>
              </div>

              <button
                onClick={() => {
                  setGeneratedCard(null)
                  setFormData({
                    name: '',
                    mobile: '',
                    city: '',
                    bloodGroup: 'O+',
                    role: 'नागरिक | Citizen'
                  })
                  setCroppedImage('')
                }}
                className="btn btn-outline-secondary mt-3 px-4 py-2"
              >
                <i className="fas fa-plus me-2"></i>
                नई ID बनाएं | Create New ID
              </button>
            </div>
          </div>
        </div>
      )}

      {showCropper && (
        <ImageCropper
          image={imageSrc}
          onCropComplete={onCropComplete}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  )
}

export default HomePage;
