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
      canvas.toBlob(resolve, 'image/jpeg', 0.9)
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

    // Client-side validation
    if (formData.name.length < 2 || formData.name.length > 100) {
      alert('नाम 2 से 100 अक्षरों के बीच होना चाहिए | Name must be between 2 and 100 characters')
      return
    }
    if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {
      alert('कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें | Please enter a valid 10-digit mobile number starting with 6-9')
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

      // Log FormData for debugging
      console.log('Sending FormData:', Object.fromEntries(formDataToSend))

      const apiResponse = await axios.post('http://localhost/tringa/backend/api/generate-id.php', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log('API Response:', apiResponse.data)

      if (apiResponse.data.success) {
        setGeneratedCard({
          ...formData,
          profileImage: croppedImage,
          tirangaId: apiResponse.data.data.tiranga_id
        })
      } else {
        alert(`ID जनरेट करने में त्रुटि | Error generating ID: ${apiResponse.data.message}`)
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message)
      alert(`ID कार्ड जनरेट करने में त्रुटि | Error generating ID card: ${error.response?.data?.message || 'Network error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCard = async () => {
    const cardElement = document.getElementById('id-card')
    if (!cardElement) {
      alert('Card element not found!')
      return
    }

    try {
      console.log('Starting download process...')
      
      // Pre-render profile image to ensure it's loaded
      if (generatedCard?.profileImage) {
        const img = await createImage(generatedCard.profileImage)
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = 160
        tempCanvas.height = 160
        tempCanvas.getContext('2d').drawImage(img, 0, 0, 160, 160)
        console.log('Profile image pre-rendered:', img.width, 'x', img.height)
      }

      const images = cardElement.querySelectorAll('img')
      await Promise.all(Array.from(images).map(img => new Promise(resolve => {
        if (img.complete && img.naturalHeight !== 0) {
          console.log('Image already loaded:', img.src)
          resolve()
        } else {
          img.onload = () => {
            console.log('Image loaded:', img.src)
            resolve()
          }
          img.onerror = () => {
            console.log('Image failed to load, using fallback:', img.src)
            resolve()
          }
          if (img.src && !img.complete) {
            img.src = img.src // Force reload
          }
        }
      })))
      console.log('All images loaded!')

      // Ensure DOM is fully rendered
      await new Promise(resolve => setTimeout(resolve, 2500))

      let canvas = null
      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`Rendering attempt ${attempt}...`)
        canvas = await html2canvas(cardElement, {
          backgroundColor: '#ffffff',
          scale: 4,
          useCORS: true,
          allowTaint: true,
          imageTimeout: 20000,
          logging: true,
          width: 600,
          height: 380,
          x: 0,
          y: 0,
          onclone: (clonedDoc) => {
            const clonedImages = clonedDoc.querySelectorAll('img')
            clonedImages.forEach(img => {
              img.setAttribute('crossOrigin', 'anonymous')
              img.style.display = 'block'
              img.style.opacity = '1'
              img.style.visibility = 'visible'
              img.style.position = 'static'
              img.style.zIndex = 'auto'
            })
            const clonedCard = clonedDoc.getElementById('id-card')
            if (clonedCard) {
              clonedCard.style.position = 'relative'
              clonedCard.style.overflow = 'visible'
              clonedCard.style.width = '600px'
              clonedCard.style.height = '380px'
            }
          }
        })

        if (canvas.width > 0 && canvas.height > 0) {
          break
        }
        console.log(`Attempt ${attempt} failed, retrying in 1s...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        console.log('DOM structure:', cardElement.outerHTML)
        throw new Error('Canvas rendering failed - check console for DOM')
      }

      console.log('Canvas created:', canvas.width, 'x', canvas.height)
      const link = document.createElement('a')
      link.download = `tiranga-id-${generatedCard.tirangaId}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log('Download completed!')
    } catch (error) {
      console.error('Download error:', error)
      alert(`डाउनलोड विफल: ${error.message}. कंसोल में विवरण देखें | Download failed: ${error.message}. Check console for details.`)
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
          <div className="govt-notice mb-4 fade-in">
            <div className="govt-notice-icon">🏛️</div>
            <p className="govt-notice-text">
              <strong>सरकारी सूचना | Government Notice:</strong> यह एक व्यक्तिगत/शैक्षणिक परियोजना है। 
              This is a personal/educational project for digital identity creation.
            </p>
          </div>

          <div className="row g-4">
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
            <div className="col-lg-8">
              <IDCardPreview 
                userData={generatedCard}
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
                  disabled={isLoading}
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