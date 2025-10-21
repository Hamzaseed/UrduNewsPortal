import React from 'react'
import './SectionHeader.css'
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SectionHeader = ({ title, category }) => {
 
 
 
 
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
    {/*   <Link to={`/category/${category}`} className="section-btn">
        <span className="btn-text">مزید پڑھیں</span>
        <FaChevronLeft className="btn-icon" />
      </Link> */}
    </div>
  )
}

export default SectionHeader
