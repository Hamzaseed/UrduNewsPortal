import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { NewsContextProvider } from "./Context/NewsContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
<StrictMode>
  <AuthProvider>
    <HelmetProvider>
      <NewsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NewsContextProvider>
    </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
