import Item_DM from './item_DM';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllDanhMuc } from '../../../../../redux/action_thunk';
import { AuthContext } from '../../../../../context/authContext';
import Loading from '../../../../layouts/loading';

function List_DM() {
  let { user } = useContext(AuthContext)
  let dispatch = useDispatch();
  let isLoadingDM = useSelector((state) => state.danhMucSL.isLoadingDM)
  let danhMucData = useSelector((state) => state.danhMucSL.danhMucDatas)
  useEffect(() => {
    if (user) {
      dispatch(getAllDanhMuc())
    }
  }, [user])

  let data = danhMucData.map((item,index) => {
    return <Item_DM key={index} {...item} i={index} />
  })

  return <>
    <div className="table-danhMuc">
      <table className="table">
        <thead>
          <tr>
            <th className='center-th' scope="col">#</th>
            <th scope="col">Tên Danh Mục</th>
            <th scope="col">Mô Tả</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingDM && <Loading top={"34"} left={"57"} position="fixed" />}
          {data}
        </tbody>
      </table>
    </div>
  </>
}

export default List_DM