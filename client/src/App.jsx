import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import { Layout, RequireAuth } from "./routes/layout/layout";
import ProfileUpdatePage  from "./routes/profileUpdatePage/profileUpdatePage"
import NewPostPage from "./routes/newPostPage/newPostPage"
import { singlePageLoader, listPageLoader, profilePageLoader, combinedChatLoader } from "./lib/loaders"
import AboutPage from "./routes/aboutPage/aboutPage";
import ContactPage from "./routes/contactPage/contactPage";
import NewChat from "./routes/newChat/newChat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader: listPageLoader
        },
        {
          path:"/:id",
          element:<SinglePage/>, 
          loader: singlePageLoader
        },
        
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/about",
          element:<AboutPage/>
        },
        {
          path:"/contact",
          element:<ContactPage/>
        },
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader: profilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage />
        },
        {
          path:"/:id/newchat",
          element:<NewChat/>, 
          loader: combinedChatLoader 
        },
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
