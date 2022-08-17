import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import reloadReducer from "./features/reload"
import nameReducer from "./features/name"
import opendivReducer from "./features/opendiv"

const store = configureStore(
  {
    reducer:{
        reload:reloadReducer,
        name:nameReducer,
        opendiv:opendivReducer,
       
    }
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store} >
    <App />
    </Provider>
  </>
);


