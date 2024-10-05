import { useNavigate } from "react-router-dom"
function Item_post({_id,title, imageUrl, content, }) {
    const navigation = useNavigate()
    function handleDetailPost() {
        navigation(`/tinTuc/detail?id=${_id}`)
    }
  return <>
      <div className="boxTin">
          <div className="boxTin_img">
              <img src={imageUrl} alt="anhloi" />
          </div>

          <div className="noiDung">
              <div className="boxTin_tieuDe">
                  <h2 onClick={handleDetailPost}>{title}</h2>
              </div>
              <div className="boxTin_noiDung">
                  <div className="p_nd">{content}
                  </div>
              </div>
          </div>
      </div>
  </>
}

export default Item_post