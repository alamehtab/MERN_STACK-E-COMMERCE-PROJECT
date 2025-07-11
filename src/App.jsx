import { useEffect, useState } from 'react'
import './App.css'
import ProductList from './features/products/components/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import Home from './features/pages/Home'
import LoginPage from './features/pages/LoginPage'
import SignupPage from './features/pages/SignupPage'
import { Route, Routes } from 'react-router-dom'
import CheckoutFormPage from './features/pages/CheckoutFormPage'
import CartPage from './features/pages/CartPage'
import ProductDetailsPage from './features/pages/ProductDetailsPage'
import Protected from './features/auth/components/Protected'
import {  fetchCartItemsAsync } from './features/cart/cartSlice'
import { selectUsers } from './features/auth/authSlice'

function App() {
  const [count, setCount] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const user = useSelector(selectUsers)

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchCartItems(user.id))
  //   }
  // }, [dispatch,user])

  useEffect(() => {
  console.log("user from Redux:", user); // <--- Step 1
  if (user) {
    console.log("Dispatching fetchCartItems with user id:", user.id); // <--- Step 2
    dispatch(fetchCartItemsAsync(user.id));
  }
}, [dispatch, user]);

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        {/* <Route path='/home' element={<Home />}></Route> */}
        <Route path='/home' element={<Protected><Home /></Protected>}></Route>
        {/* <Route path='/cart' element={<CartPage />}></Route> */}
        <Route path='/cart' element={<Protected><CartPage /></Protected>}></Route>
        {/* <Route path='/checkout' element={<CheckoutFormPage />}></Route> */}
        <Route path='/checkout' element={<Protected><CheckoutFormPage /></Protected>}></Route>
        {/* <Route path='/productdetails/:id' element={<ProductDetailsPage />}></Route> */}
        <Route path='/productdetails/:id' element={<Protected><ProductDetailsPage /></Protected>}></Route>
      </Routes>
    </>
  )
}

export default App
