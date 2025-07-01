import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productsReducer from './features/products/productSlice.js'
import cartReducer from './features/cart/cartSlice.js'
import authReducer from './features/auth/authSlice.js'
import { BrowserRouter } from 'react-router-dom'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    users: authReducer
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
