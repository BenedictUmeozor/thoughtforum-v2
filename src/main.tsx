import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/global.scss";
import { RouterProvider } from "react-router-dom";
import router from "./libs/router";
import { ThemeContextProvider } from "./context/theme";
import { Provider } from "react-redux";
import store from "./store/store";
import { SocketProvider } from "./context/socket";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
