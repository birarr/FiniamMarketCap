import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home'
import { CryptoDetails } from './components/cryptoDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cryptoDetails/:id" element={<CryptoDetails />} />
    </Routes>
  )
}

export default App
