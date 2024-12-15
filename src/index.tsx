import React from "react";
import ReactDOM from "react-dom/client";
import ColorSwatch from "./components/ColorSwatch";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ColorSwatch />
  </React.StrictMode>
);
