import { useNavigate } from "react-router-dom"
function Item_post({ _id,title, imageUrl, slug, content, metaTitle, metaDescription  }) {
    const navigation = useNavigate()
    function handleDetailPost() {
        // Sử dụng slug thay vì _id trong URL
        navigation(`/tinTuc/detail/${slug}`);
      }
    return <>
        <div className="boxTin">
        <div className="boxTin_img">
         <img  style={{borderRadius: '5px'}} src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/blogs%2F${imageUrl[0]}?alt=media`} alt="" />
        </div>

        <div className="noiDung">
          <div className="boxTin_tieuDe">
            <h2 style={{cursor: 'pointer'}} onClick={handleDetailPost}>{ metaTitle || title}</h2>
          </div>
          <div className="boxTin_noiDung">
            <div className="p_nd">{ metaDescription || content}</div>
          </div>
        </div>
      </div>
    </>
}

export default Item_post
