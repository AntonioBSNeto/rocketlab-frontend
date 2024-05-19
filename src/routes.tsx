import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import ProductPage from './pages/Product'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/produtos/:productId' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )

}