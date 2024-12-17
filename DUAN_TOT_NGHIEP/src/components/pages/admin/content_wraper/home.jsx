import { useEffect } from "react";
import ChartPriceMonth from "./charts/chartPriceMonth"
import { useDispatch, useSelector } from "react-redux";
import { getAllOder, getAllUser, getAllUserByRole } from "../../../../redux/action_thunk";

function Home() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUser())
    }, [])

    useEffect(() => {
        dispatch(getAllOder())
    }, [dispatch])

    let userDatas = useSelector((state) => state.userSL.user)
    let orderDatas = useSelector((state) => state.oderSL.oderDatasAll)
    const users = userDatas.filter((user) => user.role === "user")
    useEffect(() => {
        console.log("orderDatas", orderDatas);

    }, [])
    const orderNew = orderDatas.filter((order) => order.task_status === "Chờ xác nhận");
    const orderSuccess = orderDatas.filter((order) => order.task_status === "Đang diễn ra");


    return <>
        {/* phần tiêu đề */}
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Dashboard</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard v1</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{orderNew.length}</h3>

                                <p>Đơn hàng chờ xác nhận</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag"></i>
                            </div>
                            {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{orderSuccess.length}</h3>

                                <p style={{ color: "white" }}>Đơn hàng đang diễn ra</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-stats-bars"></i>
                            </div>
                            {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{users.length}</h3>

                                <p>Khách hàng đăng ký</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-add"></i>
                            </div>
                            {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>65</h3>

                                <p>Unique Visitors</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph"></i>
                            </div>
                            {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <ChartPriceMonth />
    </>
}

export default Home