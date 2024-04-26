import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// import App from "./App";
import Navbar from "./components/Navbar/Navbar";
import Error from "./components/Error";
import "./index.css";
import Login from "./Pages/Landing/Landing";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup/Signup.js";
import FAQPage from "./components/Faq/Faq.js";
import LoadingSpinner from "./components/LoadingSpinner/LoadinSpinner.jsx";
import Saransh from "./components/Asaransh/Demo_Id.jsx";
import AdminPanel from "./Pages/Admin/Admin.js";
import SearchPage from "./components/Search/SearchPage.jsx";
import DemoIdCard from "./components/Asaransh/Demo_IdCard.jsx";
const NearbyBusiness = lazy(() => import("./Pages/Business/Business"));
const Reward = lazy(() => import("./Pages/Reward/Reward"));

const AppLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <div className="container mx-auto flex justify-center mb-16" />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/rewards",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Reward />
          </Suspense>
        ),
      },

      {
        path: "/business?",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NearbyBusiness />
          </Suspense>
        ),
      },

      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/faq",
        element: <FAQPage />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/business/:_Id",
        element: <DemoIdCard />,
      },
      {
        path: "/demo",
        element: <Saransh />,
      },
      {
        path: "/search/:query",
        element: <SearchPage />,
      },
    ],

    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>

 
  <Auth0Provider
    domain="dev-mt2m7dc5oz0ioywm.us.auth0.com"
    clientId="odlVwUum4ZuMyMjU4cnDZ4d5veJ4fA0p"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

<RouterProvider router={appRouter} />
  </Auth0Provider>
  </React.StrictMode>
);
