import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// HashRouter is used deliberately: GitHub Pages serves static files with
// no server-side rewrite rules, so a plain BrowserRouter 404s on refresh
// of any nested route (e.g. /pos/sale). Hash-based routing sidesteps that
// without needing a 404.html redirect trick.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
