import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Header from './components/Header'
import CartPage from './components/Cart'

function App() {

  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
