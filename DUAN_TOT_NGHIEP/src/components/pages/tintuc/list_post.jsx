import Item_post from "./item_post"

function List_post() {
    return <>
        <div className="art_left">
            <div className="H1_tieuDe">
                <h1>Tin Tức</h1>
            </div>

            <div className="two_btn">
                <button className="btnTin btn_new">Mới Nhất</button>
                <button className="btnTin btn_old">Cũ Nhất</button>
            </div>

            <div className="box_mainTinTuc">
                <div className="list_TinTuc">
                    <Item_post />
                    <Item_post />
                    <Item_post />
                </div>

            </div >
        </div>
    </>
}
export default List_post