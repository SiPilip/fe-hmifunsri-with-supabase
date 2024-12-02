import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import AppLayout from "./pages/Layout/AppLayout";
import AdminLayout from "./pages/Layout/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academic from "./pages/Academic";
import Profile from "./pages/Profile";
import Proker from "./pages/Proker";
import Aspiration from "./pages/Aspiration";
import ProkerDetail from "./pages/ProkerDetail";
import AcademicCardsDetail from "./components/Academic/AcademicCardsDetail";
import Dashboard from "./pages/admin/dashboard";
import Competition from "./pages/admin/competition";
import Scholarship from "./pages/admin/scholarship";
import Seminar from "./pages/admin/seminar";
import Member from "./pages/admin/member";
import ProkerAdmin from "./pages/admin/proker";

const RouterBuilder = () => {
  //Only for client to see
  const generalRoutes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/academic",
      element: <Academic />,
    },
    {
      path: "/academic/:type/:title",
      element: <AcademicCardsDetail />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/proker",
      element: <Proker />,
    },
    {
      path: "/proker/:nav/:prokerName",
      element: <ProkerDetail />,
    },
    {
      path: "/aspiration",
      element: <Aspiration />,
    },
  ];

  const adminRoutes: RouteObject[] = [
    {
      path: "/admin",
      element: <Dashboard />,
    },
    {
      path: "/admin/competition",
      element: <Competition />,
    },
    {
      path: "/admin/scholarship",
      element: <Scholarship />,
    },
    {
      path: "/admin/seminar",
      element: <Seminar />,
    },
    {
      path: "/admin/proker",
      element: <ProkerAdmin />,
    },
    {
      path: "/admin/member",
      element: <Member />,
    },
  ];

  const routes = createBrowserRouter([
    {
      element: <AppLayout />,
      children: generalRoutes,
    },
    {
      element: <AdminLayout />,
      children: adminRoutes,
    },
  ]);

  return routes;
};

export default RouterBuilder;
