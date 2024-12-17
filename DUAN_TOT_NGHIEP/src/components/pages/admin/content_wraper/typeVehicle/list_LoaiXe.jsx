import { useContext, useEffect } from 'react';
import Item_LoaiXe from './item_LoaiXe';
import { AuthContext } from '../../../../../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVehicle } from '../../../../../redux/action_vehicle';
import Loading from '../../../../layouts/loading';

function List_LoaiXe() {
  
  let { user } = useContext(AuthContext)
  let dispatch = useDispatch();
  let isLoadingVehicle = useSelector((state) => state.vehicleSL.isLoadingVehicle)
  let vehicleDatas = useSelector((state) => state.vehicleSL.vehicleDatas)
  useEffect(() => {
    if (user) {
      dispatch(getAllVehicle())
    }
  }, [user])

  let data = vehicleDatas.map((item,index) => {
    return <Item_LoaiXe key={index} {...item} i={index} />
  })
  

  return <>
    <div className="table-danhMuc">
      <table className="table">
        <thead>
          <tr>
            <th className='center-th' scope="col">#</th>
            <th scope="col">Tên Khu vực</th>
            <th scope="col">Mô Tả</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingVehicle && <Loading top={"34"} left={"57"} position="fixed" />}
          {data}
        </tbody>
      </table>
    </div>
  </>
}

export default List_LoaiXe
