
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Dashboard} from "./pages/dashboar";
import { New } from "./pages/dashboar/new";
import { CarDetails } from "./pages/cardetails"


const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cardetails/:id",
        element: <CarDetails/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/dashboard/new",
        element: <New/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  }, 
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "*",
    element: <div>Página não encontrada!</div>
  }
  
])


export default router;
