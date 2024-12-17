import { useDispatch, useSelector } from "react-redux";
import Item_top10 from "./item_top10";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { getAllBlog } from "../../../redux/action_thunk";

function List_top10() {
  let dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  let blogDatas = useSelector((state) => state.blogSL.blogDatas);

  useEffect(() => {
    dispatch(getAllBlog());
  }, [user]);

  return (
    <>
      <div className="art_right">
        <div className="main_tinNoiBat">
          <div className="top_tinNoiBat">
            <h4>Tin Đáng Chú Ý</h4>
            <div className="Top10">
              <div className="listTop10">
                {blogDatas.map((item, index) => {
                  return <Item_top10 key={index} {...item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List_top10;
