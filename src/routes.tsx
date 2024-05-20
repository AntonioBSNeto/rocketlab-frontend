import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import ProductPage from './pages/Product'
import CartPage from './pages/Cart'
import AddressPage from './pages/Address'
import PaymentPage from './pages/Payment'
import DepartamentPage from './pages/Departament'
import SearchPage from './pages/SearchPage'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/produtos/:productId' element={<ProductPage />} />
        <Route path='/carrinho' element={<CartPage />} />
        <Route path='/endereco' element={<AddressPage />} />
        <Route path='/pagamento' element={<PaymentPage />} />
        <Route path='/departamento/:category' element={<DepartamentPage />} />
        <Route path='/busca/:searchValue' element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )

}