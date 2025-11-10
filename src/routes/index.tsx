import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Tours from "@/pages/Tours";


export const router = createBrowserRouter([

{
     Component: App,
     path: "/",
     children: [
     {
          Component: withAuth(About),
          path: "about",
     },

     {
          Component: Tours,
          path: "tours"
     }
     
     ],
},

// Admin pages
{
     Component: withAuth(DashboardLayout, role.admin as TRole || role.superAdmin),
     path: "/admin",
     children: [
          { index: true, element: <Navigate to="/admin/analytics" /> },
          ...generateRoutes(adminSidebarItems)
     ]
},

// User pages
{
     Component: withAuth(DashboardLayout, role.user as TRole),
     path: "/user",
     children: [
          { index: true, element: <Navigate to="/user/bookings" /> },
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

{
     Component: Unauthorized,
     path: "/unauthorized"
},

]);