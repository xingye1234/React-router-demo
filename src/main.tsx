import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./Layout.tsx";
import Index from "./router/index";
import Root, {loader as rootLoader, action as rootAction} from "./router/Root.tsx";
import Contact, {loader as contactLoader} from "./router/Contact.tsx";
import EditContact, {action as contactAction} from "./router/Edit";
import  {action as deleteAction} from "./router/Destroy.tsx";
import "./index.css";

const About = React.lazy(() => import("./pages/About.tsx"));
const ErrorPages = React.lazy(() => import("./error-pages.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPages />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteAction,
      },
    ],
  },
  {
    path: "/contacts/:contactId",
    element: <Contact />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
