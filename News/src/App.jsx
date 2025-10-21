import { useState } from 'react'
import Header from './components/Header/Header'
import { Route , Routes } from 'react-router-dom'
import './index.css'
import Ticker from './components/Ticker/Ticker'
import Footer from './components/Footer/Footer'
import Card from './components/Card/Card'
import Homepage from './components/Homepage/Homepage'
import Policies from './components/Policies/Policies'
import CategoryContent from './components/CategoryContent/CategoryContent'
import { importantNews ,internationalNews , articles } from './assets/assets'
import NewsManagement from './components/NewsManagement/NewsManagement'
import DetailedView from './components/DetailedView/DetailedView'
import EnPolicies from './components/EnPolicies/EnPolicies'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
     <div   className='site-container'  >
<Header onLoginClick={() => setShowAuth(true)} />

<Ticker/>
<Routes>
  <Route path='/' element={<Homepage/>}  />
  <Route path='/Policies/:type' element={<Policies/>}  />




{/*   <Route path='*' element={<h2 style={{textAlign:'center', marginTop:'50px'}} >Page Not Found 404</h2>}  /> */}
 <Route path="/articles" element={<CategoryContent title="کالمز" news={articles} />} />
        <Route path="/category/:categoryname"  element={<CategoryContent/>}  />



        <Route path="/news/:id" element={<DetailedView/>}/>
        <Route path="/Admin" element={
          <ProtectedRoute requiredRole="admin">
            <NewsManagement />
          </ProtectedRoute>
        } />
      <Route path="/EnPolicies/:type" element={<EnPolicies />} />

</Routes>

<Footer/>

     </div>
      
    </>
  )
}

export default App
