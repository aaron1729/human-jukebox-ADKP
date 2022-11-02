import React from 'react';
import { BrowserRouter } from "react-router-dom";
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

(window as any).myName = "abcde"

let myVar: number = 0;
for(let i=0; i < 9; i++) {
  myVar++
}

console.log('myVar is:', myVar);

const myFunc = () => {
  --myVar;
}

myFunc()
myFunc()

console.log('and now myVar is: ' + myVar)
