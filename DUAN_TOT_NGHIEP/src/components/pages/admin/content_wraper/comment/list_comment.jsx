import { useDispatch, useSelector } from "react-redux"
import Item_Comment from "./item_comment"
import { useEffect } from "react"
import { getAllCommentTour } from "../../../../../redux/thunk/comment_thunk"


function List_Comment() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCommentTour())
    }, [])

    const CommentDatas = useSelector((state) => state.CommentSL.commentDatas)
    console.log(CommentDatas);

    return <>
        <div className="table-danhMuc">
            <table className="table">
                <thead>
                    <tr>
                        <th className='center-th' scope="col">#</th>
                        <th scope="col">Tên Tour</th>
                        <th scope="col">Số lượng Bình luận</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {CommentDatas.map((item, index) => {
                        return <Item_Comment key={index} {...item} i={index} />
                    })}
                </tbody>
            </table>
        </div>
    </>
}

export default List_Comment