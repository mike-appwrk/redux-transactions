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
import EditTransaction from "./pages/EditTransaction";
import Delete from "./pages/Delete";
import Dashboard from "./pages/Dashboard";

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
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/transactions/:id",
        element: <TransactionDetails />,
      },
      {
        path: "/transactions/edit/:id",
        element: <EditTransaction />,
      },
      {
        path: "/transactions/delete/:id",
        element: <Delete />,
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
