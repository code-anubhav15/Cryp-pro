import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import News from './components/News/News';
import Login from './components/Login/Login';
import Transaction from './components/Transaction/Transaction';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "news",
    element: <News />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "transaction",
    element: <Transaction />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
