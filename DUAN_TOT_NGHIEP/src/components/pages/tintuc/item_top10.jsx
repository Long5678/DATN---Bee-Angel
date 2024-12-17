import { useNavigate } from "react-router-dom";

function Item_top10({imageUrl, content,slug, _id}) {
    const navigation = useNavigate();
   
    function handleDetailPost() {
        // Sử dụng slug thay vì _id trong URL
        navigation(`/tinTuc/detail/${slug}`);
      }
    return <>
        <div className="boxTop10">
            <div className="Text_tinTuc d-flex">
                <div className="boxTin_img">
                    <img  
                    style={{borderRadius: '50%', width: '50px', height:'50px'}} 
                    src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/blogs%2F${imageUrl[0]}?alt=media`}
                     alt="" />
                </div>
                <p onClick={handleDetailPost} className="truncate truncate-multiline" style={{marginLeft: '10px', marginTop: '10px', fontSize: '15px', cursor: 'pointer'}}>{content}</p>
            </div>
        </div>
    </>
}

export default Item_top10
