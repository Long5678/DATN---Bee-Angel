import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderVehicleByStatus } from "../../../../redux/thunk/action_vehicleorder";
import { AuthContext } from "../../../../context/authContext";
import Item_orderHTY_Vehicle from "./item_orderHTY_Vehicle";

function List_orderHTY_Vehicle({ activeTab, setActiveTab }) {

  const dispatch = useDispatch();
  const errOrderCar = useSelector(
    (state) => state.orderVehicleSL.isErrOrderVehicle
  );
  const { user } = useContext(AuthContext);

  useEffect(() => {
    dispatch(getAllOrderVehicleByStatus(activeTab, user?._id));
  }, [user, activeTab]);

  const dataOrderCar = useSelector(
    (state) => state.orderVehicleSL.orderVehicleDatas
  );


  return (
    <>
      <section className="body_order">
        <div className="list_orderHTY">
          {errOrderCar ? (
            <section className='box-err-order'>
              <div>
                <img src="src/publics/image/images/image.png" alt="" />
              </div>
              <div>{errOrderCar}</div>
            </section>
          ) : (
            dataOrderCar.map((order) => (
              <Item_orderHTY_Vehicle
                key={order._id}
                {...order} // Pass order properties to the item component
                setActiveTab={setActiveTab}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default List_orderHTY_Vehicle;
