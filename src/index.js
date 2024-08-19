import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './component/Context/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </CartProvider>
);


reportWebVitals();
