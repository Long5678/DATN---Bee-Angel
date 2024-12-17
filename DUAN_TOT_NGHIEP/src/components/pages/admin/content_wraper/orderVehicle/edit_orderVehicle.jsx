import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../../../context/popupContext";
import { updateOrderCar } from "../../../../../redux/thunk/action_vehicleorder";
import { useDispatch, useSelector } from "react-redux";
import { errFilter } from "../../../../../redux/car_slice";
const EditOrderVehicle = () => {
  const dispatch = useDispatch();
  const { isPopupEdit, setPopupEdit } = useContext(PopupContext);
  const [task_status, setTask_status] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const arrStatus = [
    "Chờ xác nhận",
    "Đặt xe thành công",
    "Đang diễn ra",
    "Hoàn tất",
  ];

  const [indexActive, setIndexActive] = useState(null);
  const [idCar, setIdCar] = useState(null);

  // hàm này click vào cái tour tìm kiếm nào thì lấy id đó và setLuoon cái border chọn
  const changeItemCar = (id, i) => {
    setIndexActive(i);
    setIdCar(id);
  };

  const handleTaskStatusChange = (e) => {
    const selectedStatus = e.target.value;
    if (selectedStatus) {
      setTask_status(selectedStatus);
    }
  };

  const carDatas = useSelector((state) => state.carSL.carDatas);
  const errFilter2 = useSelector((state) => state.carSL.isErrFilter);

  const oneOder = useSelector((state) => state.orderVehicleSL.oneOderVehicle);
  const userOne = useSelector((state) => state.userSL.userOne);
  const carOne = useSelector((state) => state.carSL.carOne);
  useEffect(() => {
    if (oneOder) {
      setTask_status(oneOder.task_status || "");
    }
  }, [oneOder]);

  // Hàm xử lý khi thay đổi ngày đi
  const handlePickUpDateChange = (data) => {
    const pickUpDate = new Date(data);
    const numberOfDays = parseInt(carOne.numDay, 10) || 0;

    // Tính ngày về bằng cách cộng thêm số ngày vào ngày khởi hành
    const returnDate = new Date(pickUpDate);
    returnDate.setDate(pickUpDate.getDate() + numberOfDays);

    // Định dạng ngày thành dd/mm/yyyy
    const formattedPickUpDate = `${pickUpDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(pickUpDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${pickUpDate.getFullYear()}`;

    // Cập nhật lại số ngày dựa trên ngày chọn

    setPickUpDate(formattedPickUpDate);
    // setReturnDate(formattedReturnDate);

    dispatch(errFilter(false));
  };

  const handleReturnDateChange = (data) => {
    const returnDate = new Date(data); // Ngày trả được nhập
    const numberOfDays = parseInt(carOne.numDay, 10) || 0;

    // Tính lại số ngày
    const pickUpDate = new Date(returnDate);
    pickUpDate.setDate(returnDate.getDate() - numberOfDays); // Adjust pick-up date by subtracting numberOfDays

    // Định dạng ngày thành dd/mm/yyyy
    const formattedReturnDate = `${returnDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(returnDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${returnDate.getFullYear()}`;

    // Cập nhật lại giá trị
    // setPickUpDate(formattedPickUpDate);
    setReturnDate(formattedReturnDate);

    dispatch(errFilter(false)); // Nếu có lỗi thì reset filter
  };

  const handleUpdateOrderVehicle = () => {
    dispatch(
      updateOrderCar(
        oneOder.order._id,
        idCar,
        pickUpDate,
        returnDate,
        task_status,
        shippingAddress,
        dayDifference
      )
    );
    setPopupEdit(false);
    // setCheckBtn(true);
    setPickUpDate("");
    setReturnDate("");
    setShippingAddress("");
    setTask_status("");
  };

  let [dayDifference, setDayDifference] = useState(0);
  useEffect(() => {
    if (returnDate && pickUpDate) {
      // Hàm chuyển đổi từ định dạng DD/MM/YYYY sang đối tượng Date
      const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day);
      };

      // Chuyển đổi chuỗi ngày về đối tượng Date
      const startDate = parseDate(pickUpDate);
      const endDate = parseDate(returnDate);

      // Tính khoảng cách thời gian giữa hai ngày (milisecond)
      const timeDifference = endDate - startDate;

      // Đổi từ milisecond sang ngày và làm tròn
      const calculatedDayDifference = Math.ceil(
        timeDifference / (1000 * 60 * 60 * 24)
      );
      setDayDifference(calculatedDayDifference);
    }
  }, [returnDate, pickUpDate]);

  return (
    <div className={`${isPopupEdit ? "overlay-admin" : ""}`}>
      <div
        className={`box-popop-addtour ${isPopupEdit ? "showPopup-addtour" : "nonePopup-addtour"
          }`}
      >
        {/* <div className="loaderAdd"></div> */}
        <div className="btns-change-car">
          <div
            className='btn-thongTin active-color-addTour'
          >
            Thông Tin
          </div>

        </div>


        <form>
          <>
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="">Mã đơn hàng</label>
                  <input
                    // value={oneOder?.order?._id || ""}
                    value={"TRX-" + oneOder?.order?._id?.slice(-5).toUpperCase() || ""}
                    readOnly
                    type="text"
                    className="form-control"
                    placeholder="Mã đơn"
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Tên khách hàng</label>
                  <input
                    value={userOne.name || ""}
                    readOnly
                    type="text"
                    className="form-control"
                    placeholder="Tên khách hàng"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="">Tên Xe</label>
                  <input
                    value={carOne.name || ""}
                    readOnly
                    type="text"
                    className="form-control"
                    placeholder="Tên Xe"
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Tổng tiền</label>
                  <input
                    value={oneOder?.order?.totalPrice || ""}
                    readOnly
                    type="text"
                    className="form-control"
                    placeholder="Tổng Tiền"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="">Phương thức trả</label>
                  <input
                    value={oneOder?.order?.status || ""}
                    readOnly
                    type="text"
                    className="form-control"
                    placeholder="Trạng thái"
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Trạng thái đơn</label>
                  <select
                    value={task_status || ""}
                    onChange={handleTaskStatusChange}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="" disabled hidden>
                      Chọn danh mục
                    </option>
                    {arrStatus.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>

          <div className="flex-btn-add">
            <input
              type="button"
              onClick={() => setPopupEdit(false)}
              value="Đóng"
              className="btn btn-primary back"
            />
            <input
              type="button"
              onClick={handleUpdateOrderVehicle}
              className="btn btn-primary"
              value="Cập nhật"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderVehicle;
