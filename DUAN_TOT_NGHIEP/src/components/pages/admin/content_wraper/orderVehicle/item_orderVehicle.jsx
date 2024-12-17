import React, { useContext } from "react";
import { PopupContext } from "../../../../../context/popupContext";
import Button from "@mui/material/Button";
import { useFindUserComment } from "../../../../../hooks/usefindusercomment";
import { useFindCar } from "../../../../../hooks/findFetchCar";
import { useDispatch } from "react-redux";
import { getOneVehicle } from "../../../../../redux/action_vehicle";
import { getOneUser } from "../../../../../redux/action_thunk";
import {
  getoneOrderVehicle,
  updatestatusOrderMoto,
} from "../../../../../redux/thunk/action_vehicleorder";

const ItemOrderVehicle = ({
  i,
  _id,
  pickUpDate,
  returnDate,
  idCar,
  idUser,
  status,
  task_status,
  numberOfMotorcycles,
  setTask_status,
  setActiveTab,
}) => {
  let dispatch = useDispatch();
  const { setPopupEdit } = useContext(PopupContext);
  const { setPopupDetails } = useContext(PopupContext);
  const { recipientUser } = useFindUserComment(idUser);
  const { recipientCar } = useFindCar(idCar);

  if (!recipientUser) {
    return;
  }
  if (!recipientCar) {
    return;
  }

  // Format dates to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN").format(date);
  };

  // Function to handle editing the order vehicle
  const handleDetails = () => {
    dispatch(getoneOrderVehicle(_id));
    dispatch(getOneUser(idUser));
    dispatch(getOneVehicle(idCar));
    setPopupDetails(true);
  };

  const handleOrderEdit = () => {
    dispatch(getoneOrderVehicle(_id));
    dispatch(getOneUser(idUser));
    dispatch(getOneVehicle(idCar));
    setPopupEdit(true);
  };

  async function handleConfirm() {
    const updatedStatus = "Đặt xe thành công";
    await dispatch(updatestatusOrderMoto(_id, updatedStatus));
    setTask_status("Đặt xe thành công");
    setActiveTab(1);
  }

  return (
    <>
      <tr>
        <th className="center-th" scope="row">
          {i + 1}
        </th>
        <td>{"TRX-" + _id?.slice(-5).toUpperCase()}</td>
        <td>{recipientUser.name}</td>
        <td>{recipientCar.name}</td>
        <td>
          {formatDate(pickUpDate)} - {formatDate(returnDate)}
        </td>
        <td>{numberOfMotorcycles}</td>
        <td>{task_status}</td>
        <td>{status}</td>
        <td>
          <Button
            onClick={handleDetails}
            style={{ marginRight: "10px" }}
            variant="contained" 
          >
            Chi tiết
          </Button>
          {(task_status === "Đặt xe thành công" ||
            task_status === "Chờ xác nhận") && (
              <Button
                onClick={handleOrderEdit}
                variant="contained"
                style={{ marginRight: "10px", }}
              >
                Edit
              </Button>
            )}
          {task_status === "Chờ xác nhận" && (
            <Button
              onClick={handleConfirm}
              variant="contained" color="success"
              style={{ marginRight: "10px" }}
            >
              Xác nhận
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};

export default ItemOrderVehicle;
