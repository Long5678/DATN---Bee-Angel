import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { MainContextProvider } from './context/mainContext.jsx';
import User_layouts from './components/pages/user_layouts.jsx';
import Main_home from './components/pages/home/main_home.jsx';
import Main_datTour from './components/pages/dat_tour/main_datTour.jsx';
import Main_tours from './components/pages/tours/main_tours.jsx';
import Main_detail_tour from './components/pages/detail_tour/main_detail_tour.jsx';
import Main_dieuKhoan from './components/pages/dieuKhoan/main_dieuKhoan.jsx';
// import Main_Profile from './components/pages/user_infor/main_profile.jsx';
import Gioithieu from './components/pages/gioithieu/main-gioithieu.jsx';
import Main_userInfor from './components/pages/user_infor2/main_userInfor.jsx';
import Main_lienHe from './components/pages/lienHe/main_lienHe.jsx';



const routers = createBrowserRouter([
  {
    path: "/",
    element: <User_layouts />,
    children: [
      {
        path: "",
        element: <Main_home />
      },
      {
        path: "/datTour",
        element: <Main_datTour />
      },
      {
        path: "/tours",
        element: <Main_tours />
      },
      {
        path: "/detail",
        element: <Main_detail_tour />
      },
      {
        path: "/dieuKhoan",
        element: <Main_dieuKhoan />
      },
      {
        path: "/user_profile",
        element: <Main_userInfor />
      },
      {
        path: "/about",
        element: <Gioithieu />
      },
      {
        path: "/contact",
        element: <Main_lienHe />
      },

    ]
  },
  // {
  //   path: "/auth",
  //   element: <Main_auth />,
  // },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <MainContextProvider>
    <React.StrictMode>
      <RouterProvider router={routers} />
    </React.StrictMode>
  </MainContextProvider>
)
