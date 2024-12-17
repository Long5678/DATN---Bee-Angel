import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errOrder } from "../../../../../redux/order_slice";
import { getAllOrderVehicle, getOrderByNameVehicle } from "../../../../../redux/thunk/action_vehicleorder";

function Search_OrderVehicle() {
    const dispatch = useDispatch();
    const [orderCodeVehicle, setOrderCodeVehicle] = useState(""); // Trạng thái cho mã đơn hàng

    // Gọi API khi orderCodeVehicle thay đổi
    useEffect(() => {
        dispatch(errOrder(""))
        if (orderCodeVehicle) {
            dispatch(getOrderByNameVehicle(orderCodeVehicle));
        } else if (orderCodeVehicle === "") {
            dispatch(getAllOrderVehicle());
        }
    }, [orderCodeVehicle, dispatch]);

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid box-search" style={{ justifyContent: "flex-end" }}>
                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input
                            value={orderCodeVehicle}
                            onChange={(e) => setOrderCodeVehicle(e.target.value)}
                            className="form-control me-2"
                            type="text"
                            placeholder="Nhập mã đơn hàng"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={() => {
                                // Logic xử lý khi nhấn nút Search
                                if (orderCodeVehicle.trim()) {
                                    dispatch(getOrderByNameVehicle(orderCodeVehicle));
                                } else {
                                    dispatch(getAllOrderVehicle());
                                }
                            }}
                        >
                            Tìm kiếm
                        </button>
                    </form>
                </div>
            </nav>

        </>
    );
}

export default Search_OrderVehicle;
