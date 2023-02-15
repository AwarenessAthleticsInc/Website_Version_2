import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/main';
import App from './App';
import StoreStartup from './store/StoreStartup';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StoreStartup />
      <App />
    </Provider>
  </React.StrictMode>
);
