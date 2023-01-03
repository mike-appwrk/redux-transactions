import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import Root from "./routes/root";
import Errors from "./pages/Errors";
import Home from "./pages/Home";
import Create from "./pages/Create";
import TransactionDetails from "./pages/TransactionDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Errors />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/transaction/:id",
        element: <TransactionDetails />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
