import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getOnePostBySlug } from "../../../../redux/action_thunk";
function Box_detail_post() {
    let dispatch = useDispatch();

    const { slug } = useParams();
    let blogOne = useSelector((state) => state.blogSL.blogOne);
    useEffect(() => {
      if (slug) {
        dispatch(getOnePostBySlug(slug)); // Gọi API để lấy bài viết theo slug
      }
      window.scrollTo(0, 0);
    }, [slug]);
    
  
    console.log(blogOne);
  
    const formattedDate = new Date(blogOne.datePosted).toLocaleDateString(
      "vi-VN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
    return (
        <>
              <Helmet>
        <title>{blogOne.metaTitle || blogOne.title}</title>
        <meta
          name="description"
          content={
            blogOne.metaDescription ||
            (blogOne.content
              ? blogOne.content.substring(0, 150)
              : "Default description")
          }
        />
      </Helmet>

      <div className="art_left">
        <div className="Main_thongTinDanhMuc">
          <div className="thongTinDanhMuc">{blogOne.author}</div>
          <div className="d-grid">
            <div className="ngayDang">{formattedDate}</div>
            <div className="ngayDang">Lượt xem: {blogOne.views}</div>
          </div>
        </div>

        <div className="title_detail">
          <h1>{blogOne.title}</h1>
        </div>

        <div className="content_detail">
          <p className="p_content">{blogOne.content}</p>
        </div>

        <div className="img_detai">
          {blogOne?.imageUrl?.length > 0 ? (
            blogOne.imageUrl.map((image, index) => (
              <img
                key={index}
                src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/blogs%2F${encodeURIComponent(
                  image
                )}?alt=media`}
                alt={`Blog Image ${index + 1}`}
                style={{
                  margin: "5px",
                  width: "245px",
                  height: "245px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ))
          ) : (
            <p>Không có ảnh</p>
          )}
        </div>

        <div className=" video-blog-detail">
          <h2>Video Tin tức</h2>
          {blogOne?.videoUrl?.length > 0 ? (
            <video
              controls
              autoPlay
              style={{ width: "760px", height: "500px" }}
            >
              <source
                src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/blogs%2F${blogOne?.videoUrl[0]}?alt=media`}
                type="video/mp4"
              />
            </video>
          ) : (
            <p>Video không khả dụng</p>
          )}
        </div>

        <div className="goback">
          <i className="fa-solid fa-arrow-left"></i>
          <a href="/">Quay lại</a>
        </div>
      </div>
        </>
    );
}

export default Box_detail_post;
