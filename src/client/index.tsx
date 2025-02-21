import React from 'react';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from './App';
import '../index.css'
import ErrorBoundary from './Components/ErrorComponent';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

const rootTSX = createRoot(container!);


rootTSX.render(
  <BrowserRouter>
    <CookiesProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </CookiesProvider>
  </BrowserRouter>
);






// to test the window for variables

(window as any).loggit = (data: any) => console.log('the data is:', data);
// (window as any).loggit('test the loggit function from index.tsx!')