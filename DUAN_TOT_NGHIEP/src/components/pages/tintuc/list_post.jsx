import Item_post from "./item_post"
import { useDispatch, useSelector } from 'react-redux'
import React,  { useContext, useEffect } from 'react'
import { getAllBlog, getNewestBlog, getOldestBlog } from "../../../redux/action_thunk";
import { AuthContext } from "../../../context/authContext";

function List_post() {
    let dispatch = useDispatch();
    const { user } = useContext(AuthContext)
    let blogDatas  = useSelector((state) => state.blogSL.blogDatas);

    useEffect(() => {
        dispatch(getAllBlog())
      }, [user])

      const handleNewBlog = ()=> {
        dispatch(getNewestBlog())
      }

      const handleOldBlog = ()=> {
        dispatch(getOldestBlog())
      }
    return <>
        <div className="art_left">
            <div className="H1_tieuDe">
                <h1>Tin Tức</h1>
            </div>

            <div className="two_btn">
                <button onClick={handleNewBlog} className="btnTin btn_new">Mới Nhất</button>
                <button onClick={handleOldBlog} className="btnTin btn_old">Cũ Nhất</button>
            </div>

            <div className="box_mainTinTuc">
                <div className="list_TinTuc">
                {blogDatas.map((item, index)=>{
                return   <Item_post key={index} {...item} />
            })}


                
                </div>

            </div >
        </div>
    </>
}
export default List_post