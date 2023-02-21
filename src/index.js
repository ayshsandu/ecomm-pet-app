import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider
      config={{
        signInRedirectURL: "http://localhost:3000",
        signOutRedirectURL: "http://localhost:3000",
        clientID: "4Z1bpG7XMMneIZpboIUgEDtPj5ka",
        baseUrl: "https://api.asgardeo.io/t/ayeshaecomm",
        scope: ["openid", "profile"],
        resourceServerURLs: ["https://a302ef70-2e20-4809-a281-8adfc5b8e2f6-dev.e1-us-east-azure.choreoapis.dev/qirz/ecommercerestapi/1.0.0"],
      }}
    >
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
      <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
      <App />
    </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
