import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Login from './container/Login';
import Register from './container/Register';
import Index from './container/Index';
import Detail from './container/Detail';
import AuthLayout from './container/AuthLayout';
import Homepage, { listLoader, action as listAction } from './container/Homepage';
import NewContact from './container/NewContact';
import { action as addAction, loader as addLoader } from './container/NewContact';
import {loader as detailLoader, action as detailAction} from './container/Detail';
import { action as registerAction} from './container/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthLayout />} >
        <Route index path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} action={registerAction}></Route>

        <Route path="/contact" element={<Homepage />} loader={listLoader} action={listAction}>
          <Route index path="/contact/index" element={<Index />} />
          <Route path = "" element={<Index />} />
          <Route path="/contact/add/:contactId?" element={<NewContact />} action={addAction} loader={addLoader}/>
          <Route path="/contact/detail/:contactId" element={<Detail />} loader={detailLoader} action={detailAction}/>
        </Route>
        </Route>

    )
);
root.render(<React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

