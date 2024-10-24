import * as React from "react";
import App from './App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

const root = document.querySelector('#root')

if (root) {
  createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>)
}
