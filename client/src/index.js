import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//const configureStore=require('@reduxjs/toolkit').configureStore

import { Provider } from 'react-redux';

import globalReducer from './state/globalState.js';

import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from './state/api.js';

// import globalReducer from 'state' no funciona porque hay problema con el jsconfig.js

const store = configureStore({
  reducer: {
    global: globalReducer, 
    [api.reducerPath]: api.reducer,
  },
  
  //from RTKQ
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);
//--------------------------
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
//module.exports=store
