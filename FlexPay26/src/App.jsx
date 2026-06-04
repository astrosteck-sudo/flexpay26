import './App.css'
import { HomePage } from './HomePage/Homepage'
import { PageHeader } from './PageHeader/PageHeader'
import { Routes, Route } from 'react-router'
import { SiteFooter } from './SiteFooter/SiteFooter'

function App() {
  

  return (
    <>
      <PageHeader/>
      <HomePage></HomePage>
      <SiteFooter></SiteFooter>
      {/* <Routes>
        <Route path='homepage' element={<HomePage></HomePage>}></Route>
      </Routes> */}
    </>
  )
}

export default App
