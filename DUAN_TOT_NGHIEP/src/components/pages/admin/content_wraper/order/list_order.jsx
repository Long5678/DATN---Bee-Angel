import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOder, getAllOderByStatus } from "../../../../../redux/action_thunk";
import "../../../../../publics/styles/user_infor.scss"
// import {Item_OrderManager} from "../../../admin/content_wraper/order/item_order"
// import {Page_OrderManager} from "../../../admin/content_wraper/order/page_order.jsx"
import View_order from "./detail_order";
import Item_order from "./item_order";
import Edit_order from "./edit_order";
import { errOrder } from "../../../../../redux/order_slice";
import Search_order from "./search_order"
// import Search_OrderManager from "./search_order";
function List_OrderManager() {
    let dispatch = useDispatch()
    const [task_status, setTask_status] = useState("Chờ xác nhận")
    const tabs = ['Chờ xác nhận', 'Sẵn sàng khởi hành', 'Đang diễn ra', 'Hoàn tất', 'Đã hủy'];
    useEffect(() => {
        console.log("order");
        dispatch(getAllOderByStatus(task_status))
    }, [task_status])

    useEffect(() => {
        console.log(task_status);
    }, [task_status])


    const handleChangeTab = (value, index) => {
        dispatch(errOrder(""))
        setTask_status(value)
        setActiveTab(index)

    }


    const oderDatas = useSelector((state) => state.oderSL.oderDatas)
    const oderDatasAll = useSelector((state) => state.oderSL.oderDatasAll)
    const isErrOrder = useSelector((state) => state.oderSL.isErrOrder)
    console.log("oderDatas111", oderDatas);
    console.log("oderDatasALL222", oderDatasAll);

    // function formatCurrency(value) {
    //     return Number(value).toLocaleString('vi-VN') + ' VND';
    // }

    const [activeTab, setActiveTab] = useState(0)

    // Hàm đếm số lượng đơn hàng theo trạng thái
    const getCountByStatus = (status) => {
        return oderDatasAll?.filter((item) => item.task_status === status).length || 0;
    };

    // Tải toàn bộ dữ liệu khi component được render lần đầu
    useEffect(() => {
        dispatch(getAllOder());
    }, [dispatch]);

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Danh sách đơn hàng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Orders</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Search_OrderManager/> */}

            {/* <nav className="navbar bg-body-tertiary">
                <div className="container-fluid box-search" style={{ justifyContent: "flex-start" }}>
                    <select value={task_status} onChange={(e) => handleChangeTab(e.target.value)} style={{ width: "18%", paddingLeft: "20px" }} className="form-select" aria-label="Default select example">
                        {tabs.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
                </div>
            </nav> */}

            <Search_order />
            <div className="table-danhMuc">
                <section className="main-tab-order-admin">
                    <section className="head_tab_admin">
                        {tabs.map((item, index) => {
                            return (
                                <span
                                    // ref={el => (tabRefs.current[index] = el)} // Assign ref to each tab
                                    onClick={() => handleChangeTab(item, index)}
                                    key={index}
                                    className={`${index === activeTab && "active-tab"} span-tab-order`}
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
                            <th className='center-th' scope="col">#</th>
                            <th scope="col"> Mã đơn hàng</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Tên tour</th>
                            <th scope="col">SL du khách</th>
                            <th scope="col">Thời gian đi</th>
                            <th scope="col">TT Tour</th>
                            <th scope="col">TT Thanh toán</th>
                            <th className="wide-action" scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isErrOrder
                            ?
                            <div>{isErrOrder}</div>
                            :
                            oderDatas?.map((item, index) => (
                                <Item_order key={index} {...item} i={index} setStatus_task={setTask_status} setActiveTab={setActiveTab} />
                            ))
                        }
                        {/* <ul>
                            {oderDatas.map((item,index) => {
                                return <li key={index}>{item.task_status}</li>
                            })}
                        </ul> */}
                    </tbody>
                </table>
            </div>

            <View_order />
            <Edit_order
                status_task={task_status}
                setStatus_task={setTask_status}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

        </>
    );
}

export default List_OrderManager;
