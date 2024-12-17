import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Item_orderHTY from './item_orderHTY'; // Component to display each order
import { getAllOderByStatus, getAllOderByStatusByidUser } from '../../../../redux/action_thunk';
import { AuthContext } from '../../../../context/authContext';

function List_orderHTY({ activeTabStatus, setActiveTab }) {
    let dispatch = useDispatch()
    let { user } = useContext(AuthContext)
    // const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //   // Fetch orders from the backend based on the selected tab (status)
    //   const fetchOrders = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:3000/Order/all');
    //       setOrders(response.data.orders);
    //     } catch (error) {
    //       console.error('Error fetching orders:', error);
    //     }
    //   };

    //   fetchOrders();
    // }, []);

    // Filter orders based on the selected tab
    // const filteredOrders = orders.filter(order => {
    //   switch (activeTab) {
    //     case 0: return order.task_status === 'Chờ xác nhận';
    //     case 1: return order.task_status === 'Sẵn sàng khởi hành';
    //     case 2: return order.task_status === 'Đang diễn ra';
    //     case 3: return order.task_status === 'Hoàn tất';
    //     case 4: return order.task_status === 'Đã hủy';
    //     default: return true;
    //   }
    // });



    useEffect(() => {
        console.log("order");
        dispatch(getAllOderByStatusByidUser(activeTabStatus, user?._id))

        // dispatch(getAllOder(3))
    }, [activeTabStatus])
    const oderDatas = useSelector((state) => state.oderSL.oderDatas)
    const isErrOrder = useSelector((state) => state.oderSL.isErrOrder)

    return (
        <div className="list_orderHTY">
            {
                isErrOrder
                    ?
                    <section className='box-err-order'>
                        <div>
                            <img src="src/publics/image/images/image.png" alt="" />
                        </div>
                        <div>{isErrOrder}</div>
                    </section>
                    :
                    oderDatas.map(order => (
                        <Item_orderHTY
                            key={order._id}
                            {...order} // Pass order properties to the item component
                            setActiveTab={setActiveTab}
                        />
                    ))
            }
        </div>
    );
}

export default List_orderHTY;
