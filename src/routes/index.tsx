import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";


export const router = createBrowserRouter([

{
     Component: App,
     path: "/",
     children: [
     {
          Component: About,
          path: "about",
     },
     
     ],
},

// Admin pages
{
     Component: DashboardLayout,
     path: "/admin",
     children: [
          ...generateRoutes(adminSidebarItems)
     ]
},

// User pages
{
     Component: DashboardLayout,
     path: "/user",
     children: [
          ...generateRoutes(userSidebarItems)
     ]
},

{
     Component: Register,
     path: "/register"
},

{
     Component: Login,
     path: "/login"
},

{
     Component: Verify,
     path: "/verify"
},

]);