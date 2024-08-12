import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import CardAdmin from './pages/Admin'
import PrivateRoute from './components/auth/privateroute'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <CardAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
