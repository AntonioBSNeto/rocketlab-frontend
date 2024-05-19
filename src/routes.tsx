import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )

}