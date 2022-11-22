import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CartProvider>
          <App />
        </CartProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
