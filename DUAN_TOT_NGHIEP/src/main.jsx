import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material/styles';

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext.jsx';
import User_layouts from './components/pages/user_layouts.jsx';
import Main_home from './components/pages/home/main_home.jsx';
import Main_tours from './components/pages/tours/main_tours.jsx';
import Main_detail_tour from './components/pages/detail_tour/main_detail_tour.jsx';
import Main_dieuKhoan from './components/pages/dieuKhoan/main_dieuKhoan.jsx';
import Gioithieu from './components/pages/gioithieu/main-gioithieu.jsx';
import Main_userInfor from './components/pages/user_infor2/main_userInfor.jsx';
import Main_lienHe from './components/pages/lienHe/main_lienHe.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Box_enterPass from './components/pages/auth/box_enterPass.jsx';
import Main_detail_post from './components/pages/tintuc/detail_post/main_detail_post.jsx';
import MainSideBar from './components/pages/admin/sideBar/mainSideBar.jsx';
import Home from './components/pages/admin/content_wraper/home.jsx';
import Main_danhMuc from './components/pages/admin/content_wraper/danhMuc/main_danhMuc.jsx';
import List_tourManager from './components/pages/admin/content_wraper/tourManager/list_TourManager.jsx';
import { PopupContextProvider } from './context/popupContext.jsx';
import { SocketContextProvider } from './context/socketContext.jsx';
import ChatApp from './components/pages/admin/content_wraper/chats/chatApp.jsx';
import { NotificationProvider } from './context/notificationContext.jsx';
import Main_user from './components/pages/admin/content_wraper/user/main_user.jsx';
import MainBlog from './components/pages/admin/content_wraper/blog/main_Blog.jsx';
import MainTestSMS from './components/pages/testSMS/mainTestSMS.jsx';
import Main_thanhtoan from './components/pages/thanhtoan/main_thanhtoan.jsx';
import Main_bookTour from './components/pages/book_tour/main_bookTour.jsx';
import Main_hoanthanh from './components/pages/hoanthanh/main_hoanthanh.jsx';
import List_OrderManager from './components/pages/admin/content_wraper/order/list_order.jsx';
import MainRating from './components/pages/rating/main_rating.jsx';
import List_rating from './components/pages/admin/content_wraper/rating/list_rating.jsx';
import Main_thanhtoan_conlai from './components/pages/thanhtoan_conlai/main_thanhtoan_conlai.jsx';
import Main_hoanthanhCL from './components/pages/hoanthanhCL/main_hoanthanh.jsx';
import List_ratingByTour from './components/pages/admin/content_wraper/rating/rateByTour/list_rateByTour.jsx';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/authContext.jsx';
import { useContext } from 'react';
import MainVehicle from './components/pages/admin/content_wraper/vehicle/main_Vehicle.jsx';
import Main_LoaiXe from './components/pages/admin/content_wraper/typeVehicle/main_LoaiXe.jsx';
import MainBikeCard from './components/pages/detail_xe/main-bikecard.jsx';
import Main_Xe from './components/pages/listXe/main-listXe.jsx';
import Main_datXe from './components/pages/dat_xe/main_datxe.jsx';
import Main_thanhtoanxe from './components/pages/thanhtoan_xe/main_thanhtoanxe.jsx';
import Main_hoanthanhxe from './components/pages/hoanthanhxe/main_hoanthanhxe.jsx';
import BlockUser from './components/layouts/blockUser.jsx';
import Mainerror from './components/pages/error/main_error.jsx';
import List_Notification from './components/pages/admin/content_wraper/notification/list_notification.jsx';
import List_Comment from './components/pages/admin/content_wraper/comment/list_comment.jsx';
import List_Commented from './components/pages/admin/content_wraper/comment/detailComment/list_commented.jsx';
import Main_tinTuc from './components/pages/tintuc/main_tinTuc.jsx';
import ListOrderVehicle from './components/pages/admin/content_wraper/orderVehicle/list_orderVehicle.jsx';
import List_Notificationvehicle from './components/pages/admin/content_wraper/notificationVehicle/list_notification.jsx';

const AppWrapper = () => {
  const { user, setOpen } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/rating" element={<MainRating />} />
        <Route path="/" element={<User_layouts />}>
          <Route index element={<Main_home />} />
          <Route path="bookTour" element={user ? <Main_bookTour /> : <Main_home />} />
          <Route path="tours" element={<Main_tours />} />
          <Route path="detail" element={<Main_detail_tour />} />
          <Route path="thanhtoan" element={user ? <Main_thanhtoan /> : <Main_home />} />
          <Route path="thanhtoanxe" element={user ? <Main_thanhtoanxe /> : <Main_home />} />
          <Route path="hoanthanhxe" element={<Main_hoanthanhxe />} />
          <Route path="hoanthanh" element={<Main_hoanthanh />} />
          <Route path="dieuKhoan" element={<Main_dieuKhoan />} />
          <Route path="user_profile" element={user ? <Main_userInfor /> : <Main_home />} />
          <Route path="about" element={<Gioithieu />} />
          <Route path="contact" element={<Main_lienHe />} />
          <Route path="auth/resetpassword" element={<Box_enterPass />} />
          <Route path="tinTuc" element={<Main_tinTuc />} />
          <Route path="tinTuc/detail/:slug" element={<Main_detail_post />} />
          <Route path="hoanthanhCL" element={<Main_hoanthanhCL />} />
          <Route path="thanhtoan_conlai" element={<Main_thanhtoan_conlai />} />
          <Route path="detail-car" element={<MainBikeCard />} />
          <Route path="formdatxe" element={<Main_datXe />} />
          <Route path="listxe" element={<Main_Xe />} />
          <Route path="error" element={<Mainerror />} />
        </Route>

        <Route path="/manager" element={user?.role === "admin" || user?.role === "staff" ? <MainSideBar /> : <Main_home />}>
          <Route path="" element={user?.role === "admin" ? <Home /> : <Main_danhMuc />} />
          <Route path="danhMuc" element={<Main_danhMuc />} />
          <Route path="tour" element={<List_tourManager />} />
          <Route path="blog" element={<MainBlog />} />
          <Route path="chats" element={<ChatApp />} />
          <Route path="users" element={<Main_user />} />
          <Route path="orders" element={<List_OrderManager />} />
          <Route path="vehicle" element={<MainVehicle />} />
          <Route path="order-vehicle" element={<ListOrderVehicle />} />
          <Route path="loaiXe" element={<Main_LoaiXe />} />
          <Route path="rating" element={<List_rating />} />
          <Route path="rating/rated" element={<List_ratingByTour />} />
          <Route path='/manager/notification' element={<List_Notification />} />
          <Route path='/manager/notificationvehicle' element={<List_Notificationvehicle />} />
          <Route path='/manager/Comment' element={<List_Comment />} />
          <Route path='/manager/Comment/List-Commented' element={<List_Commented />} />
        </Route>

        <Route path="/blockAccount" element={<BlockUser />}>
        </Route>

      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthContextProvider>
      <SocketContextProvider>
        <PopupContextProvider>
          <NotificationProvider>
            <AppWrapper />
          </NotificationProvider>
        </PopupContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </Provider>
);
