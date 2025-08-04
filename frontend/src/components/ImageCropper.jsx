import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropChange = useCallback((crop) => {
    setCrop(crop)
  }, [])

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom)
  }, [])

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = () => {
    if (!croppedAreaPixels) {
      alert('Please crop the image first')
      return
    }
    onCropComplete(croppedAreaPixels)
  }

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
        backdropFilter: 'blur(5px)'
      }}
    >
      <div className="govt-card" style={{width: '90%', maxWidth: '500px'}}>
        <div className="govt-card-header">
          <h3 className="mb-0 text-white fw-bold">
            <i className="fas fa-crop me-2"></i>
            अपनी प्रोफाइल फोटो को क्रॉप करें
          </h3>
          <small className="text-white-50 d-block mt-1">
            Crop Your Profile Picture
          </small>
        </div>
        
        <div className="p-4">
          <div 
            className="position-relative mb-4 border border-2 border-primary rounded"
            style={{height: '300px'}}
          >
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropCompleteHandler}
              style={{
                containerStyle: {
                  borderRadius: '8px'
                }
              }}
            />
          </div>

          <div className="mb-4">
            <label className="govt-label">
              <i className="fas fa-search-plus me-2"></i>
              ज़ूम नियंत्रण | Zoom Control
            </label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="form-range"
              style={{
                background: `linear-gradient(to right, var(--tiranga-saffron) 0%, var(--tiranga-green) 100%)`
              }}
            />
            <div className="d-flex justify-content-between text-small text-muted">
              <span>छोटा | Small</span>
              <span>बड़ा | Large</span>
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              onClick={onCancel}
              className="btn btn-outline-secondary flex-fill govt-btn"
            >
              <i className="fas fa-times me-2"></i>
              रद्द करें | Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn govt-btn-primary flex-fill"
            >
              <i className="fas fa-check me-2"></i>
              सेव करें | Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper;