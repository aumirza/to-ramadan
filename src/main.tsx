import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.tsx";
import { LocationProvider } from "./hooks/useLocation.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocationProvider>
        <App />
    </LocationProvider>
  </StrictMode>
);
