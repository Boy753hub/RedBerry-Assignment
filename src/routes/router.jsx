import { Outlet, createHashRouter } from "react-router-dom";
import Header from "../components/Header";
import MainPage from "../pages/MainPage";

export const router = createHashRouter([
    {
        element: (
            <div>
                <Header />
                <Outlet />
            </div>
          ),
          path: "/",
          children: [
            {
                index: true,
                element: <MainPage />,
            }
        ]
    }
    
  ]);
  