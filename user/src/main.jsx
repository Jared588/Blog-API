import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReactGA from "react-ga4";

const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASURING_ID;
ReactGA.initialize(measurementId, {
  gaOptions: {
    anonymizeIp: true,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
