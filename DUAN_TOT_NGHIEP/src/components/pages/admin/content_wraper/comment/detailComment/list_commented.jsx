import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getCommentByTourID } from "../../../../../../redux/thunk/comment_thunk";
import { useSearchParams } from 'react-router-dom';
import Item_Commented from "./iten_commented";

function List_Commented() {
    let dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const tourId = searchParams.get("id");

    useEffect(() => {
        dispatch(getCommentByTourID(tourId))
    }, [tourId])
    const commentDatas = useSelector((state) => state.CommentSL.commentDatas)
    console.log(commentDatas);

    return <>
        <div className="table-danhMuc">
            <table className="table">
                <thead>
                    <tr>
                        <th className='center-th' scope="col">#</th>
                        <th scope="col">Tên Người Dùng</th>
                        <th scope="col">Bình luận</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {commentDatas.length == 0 ?
                        <div>Tour này chưa có bình luận</div>
                        :
                        commentDatas.map((item, index) => {
                            return <Item_Commented key={index} {...item} i={index} />
                        })
                    }
                    {/* {commentDatas.map((item,index) => {
                    return <Item_Commented key={index} {...item} i={index} />
                })} */}
                </tbody>
            </table>
        </div>
    </>
}

export default List_Commented