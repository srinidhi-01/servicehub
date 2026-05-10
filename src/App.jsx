import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CustomerLogin from './pages/CustomerLogin'
import CustomerDashboard from './pages/CustomerDashboard'
import VendorLogin from './pages/VendorLogin'
import VendorDashboard from './pages/VendorDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
