import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Error, RouterApp } from "./components";
import "./index.css";
import { DragDrop, Results } from "./pages";
import { RouterAppProvider } from "./providers";
import reportWebVitals from "./reportWebVitals";
const langs = require("./assets/langs.json");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterAppProvider
      routerAppProvider={[
        {
          id: langs.APP.LABEL.HOME,
          path: "/",
          element: <App />,
          children: [
            {
              id: langs.APP.LABEL.DRAGDROP,
              path: "drag-drop",
              canActivate: true,
              element: <DragDrop />,
              showElement: <DragDrop />,
              errorElement: <Error error={404} />,
            },
            {
              id: langs.APP.LABEL.RESULTS,
              path: "results",
              canActivate: false,
              element: <Results />,
              showElement: <Results />,
              errorElement: <Error error={404} />,
            },
          ],
        },
      ]}
    >
      <RouterApp />
    </RouterAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
