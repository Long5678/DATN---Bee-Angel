import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOder, getOrderByNameAndDate } from "../../../../../redux/action_thunk";
import { errOrder } from "../../../../../redux/order_slice";

function Search_OrderManager() {
    const dispatch = useDispatch();
    const [orderCode, setOrderCode] = useState(""); // Trạng thái cho mã đơn hàng

    // Gọi API khi orderCode thay đổi
    useEffect(() => {
        dispatch(errOrder(""))
        if (orderCode) {
            dispatch(getOrderByNameAndDate(orderCode));
        }else if (orderCode === ""){
            dispatch(getAllOder());
        }
    }, [orderCode, dispatch]);

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid box-search" style={{ justifyContent: "flex-end" }}>
                    <form className="d-flex" role="search">
                        <input
                            value={orderCode}
                            onChange={(e) => setOrderCode(e.target.value)}
                            className="form-control me-2"
                            type="search"
                            placeholder="Nhập mã đơn hàng"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-danger" type="button">
                            Search
                        </button>
                    </form>
                </div>
            </nav>
        </>
    );
}

export default Search_OrderManager;
