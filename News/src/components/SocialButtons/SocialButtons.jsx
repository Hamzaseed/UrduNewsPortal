import React from 'react'
import { FaEnvelope, FaWhatsapp, FaTwitter, FaFacebookF, FaShareAlt } from "react-icons/fa"
import './SocialButtons.css'

const SocialButtons = ({ url, text }) => {
    const encodedURL = encodeURIComponent(url); 
    const encodedText = encodeURIComponent(text);
    
    return (
        <nav className="social-buttons" aria-label="Social sharing options">
            <ul>
                <li>
                    <a 
                        href={`mailto:?subject=${encodedText}&body=${encodedText}%20${encodedURL}`} 
                        className="btn email"
                        aria-label="Share via email"
                    >
                        <span>ای میل</span>
                        <FaEnvelope size={26} />
                    </a>
                </li>
                
                <li>
                    <a 
                        href={`https://wa.me/?text=${encodedText}%20${encodedURL}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn whatsapp"
                        aria-label="Share on WhatsApp"
                    >
                        <span>واٹس ایپ</span>
                        <FaWhatsapp size={26} />
                    </a>
                </li>
                
                <li>
                    <a 
                        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn twitter"
                        aria-label="Share on Twitter"
                    >
                        <span>ٹوئٹر</span>
                        <FaTwitter size={26} />
                    </a>
                </li>
                
                <li>
                    <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn facebook"
                        aria-label="Share on Facebook"
                    >
                        <span>فیس بک</span>
                        <FaFacebookF size={26} />
                    </a>
                </li>
                
                <li>
                    <button 
                        className="btn share" 
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ 
                                    title: text, 
                                    text: text, 
                                    url: url 
                                });
                            } else {
                                alert("Sharing not supported in this browser.");
                            }
                        }}
                        aria-label="Share using native share dialog"
                    >
                        <span>شیئر</span>
                        <FaShareAlt />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default SocialButtons