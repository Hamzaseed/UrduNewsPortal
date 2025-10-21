import React from 'react'
import './Policies.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { importantNews, legalContent } from '../../assets/assets'
import SectionHeader from '../Section/SectionHeader'
import HeadLines from '../HeadLines/HeadLines'
const Policies = () => {



     const { type } = useParams(); // "privacy", "terms", etc.
  const page = legalContent[type];

  if (!page) {
    return <h2>Page not found</h2>;
  }
  return (
   <>
  
    <main className="legal-page container">

      <div   className='legal-content'   >
      <h2>{page.title}</h2>
      <p>{page.text}</p>
      </div>



    </main>
   
   </>
  )
}

export default Policies
