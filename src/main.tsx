import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "@/router/AppRouter";
import "@/index.css";
import "@/locales/i18n";
import { Provider } from "react-redux";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { store } from "./app/store";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={AppRoutes} />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
