
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import CardAdmin from './pages/Admin'

function App() {
 
  return (
    <>
     <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/login" element={<Login/>}/>
     <Route path="/admin/dashboard" element={<CardAdmin/>}/>
     </Routes>
    </>
  )
}

export default App
