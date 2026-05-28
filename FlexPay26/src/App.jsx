import './App.css'
import { HomePage } from './HomePage/Homepage'
import { PageHeader } from './PageHeader/PageHeader'
import { Routes, Route } from 'react-router'

function App() {
  

  return (
    <>
      <PageHeader/>
      <HomePage></HomePage>
      {/* <Routes>
        <Route path='homepage' element={<HomePage></HomePage>}></Route>
      </Routes> */}
    </>
  )
}

export default App
