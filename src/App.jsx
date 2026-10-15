import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Home from './pages/Home'
import Register from './pages/Register'
import Admin from './pages/Admin'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </MotionConfig>
  )
}
