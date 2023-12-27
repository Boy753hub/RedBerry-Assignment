import { Outlet, createHashRouter } from "react-router-dom";
import Header from "../components/Header";
import MainPage from "../pages/MainPage";
import AddBlogPage from "../pages/AddBlogPage";
import VlogHeader from "../components/VlogHeader";

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
    },
    {
        element: (
            <div>
                <VlogHeader />
                <AddBlogPage />
            </div>
        ),
        path: "/addBlog",
    }
    
  ]);
  