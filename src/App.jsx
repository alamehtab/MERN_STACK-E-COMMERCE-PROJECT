import { useEffect, useState } from 'react'
import './App.css'
import ProductList from './features/products/components/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import Home from './features/pages/Home'
import LoginPage from './features/pages/LoginPage'
import SignupPage from './features/pages/SignupPage'
import {  Route, Routes } from 'react-router-dom'
import CheckoutFormPage from './features/pages/CheckoutFormPage'
import CartPage from './features/pages/CartPage'
import ProductDetailsPage from './features/pages/ProductDetailsPage'
import Protected from './features/auth/components/Protected'

function App() {
  const [count, setCount] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()


  return (
    <>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignupPage />}></Route>
          <Route path='/home' element={<Protected><Home /></Protected>}></Route>
          <Route path='/cart' element={<Protected><CartPage /></Protected>}></Route>
          <Route path='/checkout' element={<Protected><CheckoutFormPage /></Protected>}></Route>
          <Route path='/productdetails/:id' element={<Protected><ProductDetailsPage /></Protected>}></Route>
        </Routes>
    </>
  )
}

export default App
