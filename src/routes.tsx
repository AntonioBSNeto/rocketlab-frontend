import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import ProductPage from './pages/Product'
import CartPage from './pages/Cart'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/produtos/:productId' element={<ProductPage />} />
        <Route path='/carrinho' element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )

}