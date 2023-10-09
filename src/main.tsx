import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/global.scss";
import { RouterProvider } from "react-router-dom";
import router from "./libs/router";
import { ThemeContextProvider } from "./context/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>
);
