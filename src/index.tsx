import * as React from "react";
import App from './App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

const root = document.querySelector('#root')

if (root) {
  createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>)
}
