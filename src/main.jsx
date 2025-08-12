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


// // main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

// import productsReducer from './features/products/productSlice.js';
// import cartReducer from './features/cart/cartSlice.js';
// import authReducer from './features/auth/authSlice.js';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // uses localStorage
// import { PersistGate } from 'redux-persist/integration/react';
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';

// // 👉 Combine reducers
// const rootReducer = combineReducers({
//   products: productsReducer,
//   cart: cartReducer,         // <- we'll persist this
//   users: authReducer,
// });

// // 👉 Persist config
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart','products','users'], // Only persist the 'cart' slice
// };

// // 👉 Wrap with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // 👉 Configure store with persisted reducer
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// // 👉 Create the persistor
// const persistor = persistStore(store);

// // 👉 Render your app
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>
// );
