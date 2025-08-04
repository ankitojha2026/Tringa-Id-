  import React from 'react'

  const TermsOfUse = () => {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="govt-card fade-in">
              <div className="govt-card-header">
                <h1 className="mb-0 text-white fw-bold">
                  <i className="fas fa-file-contract me-3"></i>
                  नियम व शर्तें | Terms of Use
                </h1>
                <small className="text-white-50 d-block mt-2">
                  सेवा के उपयोग से पहले कृपया पढ़ें | Please read before using the service
                </small>
              </div>
              
              <div className="p-5">
                <section className="mb-5">
                  <h2 className="h4 text-primary fw-bold mb-3">
                    <i className="fas fa-handshake me-2"></i>
                    शर्तों की स्वीकृति | Acceptance of Terms
                  </h2>
                  <p className="text-muted">
                    तिरंगा ID जनरेटर का उपयोग करके, आप इस समझौते के नियमों और प्रावधानों से बाध्य होने के लिए सहमत हैं।
                    <br/><em>By accessing and using the Tiranga ID Generator, you accept and agree to be bound by the terms and provisions of this agreement.</em>
                  </p>
                </section>

                <section className="mb-5">
                  <div className="alert alert-danger border-0" style={{background: 'linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%)'}}>
                    <h4 className="alert-heading text-danger">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      महत्वपूर्ण चेतावनी | Important Warning
                    </h4>
                    <hr className="border-danger"/>
                    <p className="mb-0">
                      <strong>यह सेवा केवल व्यक्तिगत, शैक्षणिक और मनोरंजन उद्देश्यों के लिए है।</strong> 
                      जेनरेट किए गए ID कार्ड आधिकारिक सरकारी दस्तावेज नहीं हैं।
                      <br/><em><strong>This service is for personal, educational, and entertainment purposes only.</strong> 
                      The generated ID cards are NOT official government documents.</em>
                    </p>
                  </div>
                </section>

                <section className="mb-5">
                  <h2 className="h4 text-primary fw-bold mb-3">
                    <i className="fas fa-ban me-2"></i>
                    निषिद्ध उपयोग | Prohibited Uses
                  </h2>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card border-danger h-100">
                        <div className="card-header bg-danger text-white">
                          <h6 className="mb-0">
                            <i className="fas fa-times-circle me-2"></i>
                            आप नहीं कर सकते | You Cannot
                          </h6>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="fas fa-times text-danger me-2"></i>
                              अवैध या धोखाधड़ी गतिविधियों के लिए उपयोग
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-times text-danger me-2"></i>
                              आधिकारिक सरकारी दस्तावेज के रूप में प्रस्तुत करना
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-times text-danger me-2"></i>
                              झूठी जानकारी का उपयोग करना
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-times text-danger me-2"></i>
                              स्थानीय, राष्ट्रीय या अंतर्राष्ट्रीय कानूनों का उल्लंघन
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card border-success h-100">
                        <div className="card-header bg-success text-white">
                          <h6 className="mb-0">
                            <i className="fas fa-check-circle me-2"></i>
                            अनुमतित उपयोग | Allowed Uses
                          </h6>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              व्यक्तिगत पहचान बनाना
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              शैक्षणिक परियोजनाओं के लिए
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              सोशल मीडिया पर साझा करना
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              मनोरंजन उद्देश्यों के लिए
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-5">
                  <h2 className="h4 text-primary fw-bold mb-3">
                    <i className="fas fa-user-check me-2"></i>
                    उपयोगकर्ता की जिम्मेदारियां | User Responsibilities
                  </h2>
                  <div className="bg-light p-4 rounded">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="text-success">
                          <i className="fas fa-thumbs-up me-2"></i>
                          आपकी जिम्मेदारी है:
                        </h6>
                        <ul className="small">
                          <li>सटीक जानकारी प्रदान करना</li>
                          <li>उपयुक्त प्रोफाइल इमेज का उपयोग</li>
                          <li>अपने ID की सुरक्षा बनाए रखना</li>
                          <li>सेवा का जिम्मेदार उपयोग</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-info">
                          <i className="fas fa-info-circle me-2"></i>
                          Your responsibility:
                        </h6>
                        <ul className="small text-muted">
                          <li>Providing accurate information</li>
                          <li>Using appropriate profile images</li>
                          <li>Maintaining security of your ID</li>
                          <li>Using the service responsibly</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-5">
                  <h2 className="h4 text-primary fw-bold mb-3">
                    <i className="fas fa-qrcode me-2"></i>
                    QR कोड उपयोग | QR Code Usage
                  </h2>
                  <div className="alert alert-info border-0" style={{background: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)'}}>
                    <p className="mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      आपके ID पर जेनरेट किया गया QR कोड केवल इस सिस्टम के भीतर सत्यापन उद्देश्यों के लिए है। 
                      इसमें आपके जेनरेट किए गए ID की प्रामाणिकता सत्यापित करने के लिए एक लिंक है लेकिन इसकी कोई आधिकारिक मान्यता नहीं है।
                      <br/><em>The QR code generated on your ID is for verification purposes within this system only. 
                      It contains a link to verify the authenticity of your generated ID but has no official recognition.</em>
                    </p>
                  </div>
                </section>

                <section className="mb-5">
                  <h2 className="h4 text-primary fw-bold mb-3">
                    <i className="fas fa-copyright me-2"></i>
                    बौद्धिक संपदा | Intellectual Property
                  </h2>
                  <p className="text-muted">
                    सेवा डिज़ाइन, लोगो और कार्यक्षमता तिरंगा ID जनरेटर परियोजना की संपत्ति है। 
                    आप अपनी व्यक्तिगत जानकारी और छवियों के स्वामित्व को बनाए रखते हैं।
                    <br/><em>The service design, logo, and functionality are the property of the Tiranga ID Generator project. 
                    You retain ownership of any personal information and images you provide.</em>
                  </p>
                </section>

                <section className="mb-5">
                  <h2 className="h4 text-primary fw-bold mb-3">
                    <i className="fas fa-shield-alt me-2"></i>
                    दायित्व की सीमा | Limitation of Liability
                  </h2>
                  <div className="alert alert-warning border-0" style={{background: 'linear-gradient(135deg, #FFFBEB 0%, #FED7AA 100%)'}}>
                    <p className="mb-0">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      यह सेवा "जैसी है" बिना किसी वारंटी के प्रदान की जाती है। 
                      हम इस सेवा के उपयोग से होने वाली किसी भी क्षति के लिए उत्तरदायी नहीं हैं।
                      <br/><em>This service is provided "as is" without any warranties. 
                      We are not liable for any damages arising from the use of this service.</em>
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="h4 text-primary fw-bold mb-3">
                    <i className="fas fa-edit me-2"></i>
                    शर्तों में परिवर्तन | Changes to Terms
                  </h2>
                  <div className="bg-light p-4 rounded">
                    <p className="mb-0">
                      हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। 
                      सेवा का निरंतर उपयोग संशोधित शर्तों की स्वीकृति का गठन करता है।
                      <br/><em className="text-muted">
                        We reserve the right to modify these terms at any time. 
                        Continued use of the service constitutes acceptance of the modified terms.
                      </em>
                    </p>
                  </div>
                </section>

                <div className="text-center mt-5 pt-4 border-top">
                  <p className="text-muted mb-0">
                    <i className="fas fa-heart text-danger me-2"></i>
                    भारत के लिए गर्व के साथ बनाया गया | Made with Pride for India
                    <i className="fas fa-heart text-danger ms-2"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default TermsOfUse

