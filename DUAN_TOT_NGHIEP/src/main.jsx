import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthContextProvider } from './context/authContext.jsx';
import User_layouts from './components/pages/user_layouts.jsx';
import Main_home from './components/pages/home/main_home.jsx';
import Main_datTour from './components/pages/dat_tour/main_datTour.jsx';
import Main_tours from './components/pages/tours/main_tours.jsx';
import Main_detail_tour from './components/pages/detail_tour/main_detail_tour.jsx';
import Main_dieuKhoan from './components/pages/dieuKhoan/main_dieuKhoan.jsx';
import Gioithieu from './components/pages/gioithieu/main-gioithieu.jsx';
import Main_userInfor from './components/pages/user_infor2/main_userInfor.jsx';
import Main_lienHe from './components/pages/lienHe/main_lienHe.jsx';
import { Provider } from "react-redux"
import { store } from './redux/store.js'
import Box_enterPass from './components/pages/auth/box_enterPass.jsx';
import Main_tinTuc from './components/pages/tintuc/main_tinTuc.jsx';
import Main_detail_post from './components/pages/tintuc/detail_post/main_detail_post.jsx';
import MainSideBar from './components/pages/admin/sideBar/mainSideBar.jsx';
import Home from './components/pages/admin/content_wraper/home.jsx';
import Main_danhMuc from './components/pages/admin/content_wraper/danhMuc/main_danhMuc.jsx';
import List_tourManager from './components/pages/admin/content_wraper/tourManager/list_TourManager.jsx'
import { PopupContextProvider } from './context/popupContext.jsx'
import { SocketContextProvider } from './context/socketContext.jsx'
import ChatApp from './components/pages/admin/content_wraper/chats/chatApp.jsx'
import { NotificationProvider } from './context/notificationContext.jsx'
import Main_user from './components/pages/admin/content_wraper/user/main_user.jsx'


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
      {
        path: "/auth/resetpassword",
        element: <Box_enterPass />
      },
      {
        path: "/tinTuc",
        element: <Main_tinTuc />
      },
      {
        path: "/tinTuc/detail",
        element: <Main_detail_post />
      },
    ]
  },

  {
    path: "/manager",
    element: <MainSideBar />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/manager/danhMuc",
        element: <Main_danhMuc />
      },
      {
        path: "/manager/tour",
        element: <List_tourManager />
      },
      {
        path: "/manager/chats",
        element: <ChatApp />
      },
      {
        path: "/manager/users",
        element: <Main_user />
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthContextProvider>
      <SocketContextProvider>
        <PopupContextProvider>
          <NotificationProvider>
            <React.StrictMode>
              <RouterProvider router={routers} />
            </React.StrictMode>
          </NotificationProvider>
        </PopupContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </Provider>
)
