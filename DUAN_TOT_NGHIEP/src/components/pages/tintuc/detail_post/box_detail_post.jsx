import { useSearchParams } from "react-router-dom"
import { getOnePost } from "../../../../redux/action_thunk";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
function Box_detail_post() {
    let dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const idPost = searchParams.get("id"); 
    let blogOne = useSelector((state) => state.blogSL.blogOne)

    useEffect(() => {
        if(idPost) {
            dispatch(getOnePost(idPost))
        }
        // Cuộn lên đầu trang khi component render
        window.scrollTo(0, 0);
    }, [idPost])

    console.log(blogOne);

    const formattedDate = new Date(blogOne.datePosted).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  return <>
      <div className="art_left">
          <div className="Main_thongTinDanhMuc">
              <div className="thongTinDanhMuc">{blogOne.author}</div>
              <div className="ngayDang">{formattedDate}</div>
          </div>

          <div className="title_detail">
              <h1>{blogOne.title}</h1>
          </div>

          <div className="content_detail">
              <p className="p_content">{blogOne.content}
              </p>
          </div>

          <div className="img_detai">
              <img src={blogOne.imageUrl} alt="anhloi" />
          </div>

          <div className=" video-blog-detail">
            <h2>Video Tin Blog</h2>
                {blogOne?.videoUrl?.length > 0 ? (
                    <video controls autoPlay>
                        <source src={`${blogOne?.videoUrl[0]}`} type="video/mp4" />
                    </video>
                ) : (
                    <p>Video không khả dụng</p>
                )}
            </div>

          <div className="goback">
              <i className="fa-solid fa-arrow-left"></i><a href="/">Quay lại</a>
          </div>

      </div>
  </>
}

export default Box_detail_post