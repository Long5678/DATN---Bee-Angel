import React, { useEffect, useState } from "react";
import ItemOrderVehicle from "./item_orderVehicle";
import PageOrderVehicle from "./page_orderVehicle";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOderCarByStatus,
  getAllOrderVehicle,
} from "../../../../../redux/thunk/action_vehicleorder";
import { errOrderVehicle } from "../../../../../redux/ordervehicle_slice";
import DetailsOrderVehicle from "./details_orderVehicle";
import EditOrderVehicle from "./edit_orderVehicle";
import Search_OrderVehicle from "./search_OrderVehicle";
const ListOrderVehicle = () => {
  let dispatch = useDispatch();
  const [task_status, setTask_status] = useState("Chờ xác nhận");
  const tabs = [
    "Chờ xác nhận",
    "Đặt xe thành công",
    "Đang diễn ra",
    "Hoàn tất",
    "Đã hủy",
  ];
  const orderVehicleDatas = useSelector(
    (state) => state.orderVehicleSL.orderVehicleDatas
  );
  const isErrOrderVehicle = useSelector(
    (state) => state.orderVehicleSL.isErrOrderVehicle
  );
  const orderVehicleDatasAll = useSelector(
    (state) => state.orderVehicleSL.orderVehicleDatasAll
  );

  useEffect(() => {
    dispatch(getAllOderCarByStatus(task_status));
  }, [task_status]);

  useEffect(() => {
    console.log(task_status);
  }, [task_status]);

  const handleChangeTabMoto = (value, index) => {
    console.log("Tab được chọn:", value, index);
    dispatch(errOrderVehicle(""));
    setTask_status(value);
    setActiveTab(index);
  };

  const [activeTab, setActiveTab] = useState(0); // Lưu trữ tab đang được chọn, mặc định là tab đầu tiên

  // Hàm tính số lượng đơn hàng theo trạng thái
  const getCountByStatus = (status) => {
    return (
      orderVehicleDatasAll?.filter((item) => item.task_status === status)
        .length || 0
    );
  };

  // Tải toàn bộ dữ liệu khi component được render lần đầu
  useEffect(() => {
    dispatch(getAllOrderVehicle());
  }, [dispatch]);


  useEffect(() => {
    console.log("Active Tab:", activeTab);
    console.log("Task Status:", task_status);
  }, [activeTab, task_status]);
  useEffect(() => {
    dispatch(getAllOderCarByStatus(task_status))
      .then((res) => console.log("Dữ liệu mới:", res))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, [task_status]);

  return (
    <>

      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Đơn hàng xe</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Don hang xe</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <Search_OrderVehicle />
      <div className="table-danhMuc">
        <section className="main-tab-order-admin">
          <section className="head_tab_admin">
            {tabs.map((item, index) => {
              return (
                <span
                  // ref={el => (tabRefs.current[index] = el)} // Assign ref to each tab
                  onClick={() => handleChangeTabMoto(item, index)}
                  key={index}
                  className={`${index === activeTab && "active-tab"
                    } span-tab-order`}
                >
                  {item}
                  <span className="count">{getCountByStatus(item)}</span>
                </span>
              );
            })}
          </section>
        </section>

        <table className="table">
          <thead>
            <tr>
              <th className="center-th" scope="col">
                #
              </th>
              <th scope="col"> Mã đơn hàng</th>
              <th scope="col">Người đặt xe</th>
              <th scope="col">Tên Xe</th>
              <th scope="col">Ngày Nhận - Ngày Trả</th>
              <th scope="col">Số lượng xe</th>
              <th scope="col">TT Xe</th>
              <th scope="col">TT Thanh toán</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {isErrOrderVehicle ? (
              <div style={{ alignItems: 'center', justifyContent: 'center' }}>{isErrOrderVehicle}</div>
            ) : (
              orderVehicleDatas?.map((item, index) => (
                <ItemOrderVehicle key={index} {...item} i={index} setTask_status={setTask_status} setActiveTab={setActiveTab} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditOrderVehicle />
      <DetailsOrderVehicle />
      <PageOrderVehicle />
    </>
  );
};

export default ListOrderVehicle;
