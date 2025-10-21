import React from 'react'
import { useParams } from 'react-router-dom'
import './EnPolicies.css'
import { EnlegalContent } from '../../assets/assets'
const EnPolicies = () => {
  
    const { type } = useParams(); // "privacy", "terms", etc.
    const page = EnlegalContent[type];
    if (!page) {
      return <h2>Page not found</h2>;
    }
  
    return (

  <main className="Enlegal-page container">

      <div   className='Enlegal-content'   >
      <h2>{page.title}</h2>
      <p>{page.text}</p>
     
      </div>



    </main>
  )
}

export default EnPolicies
