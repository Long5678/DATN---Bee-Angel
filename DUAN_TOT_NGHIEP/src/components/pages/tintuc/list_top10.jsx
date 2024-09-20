import Item_top10 from "./item_top10"

function List_top10() {
    return <>
        <div className="art_right">
            <div className="main_tinNoiBat">
                <div className="top_tinNoiBat">
                    <h4>Tin Đáng Chú Ý</h4>
                    <div className="Top10">
                        <div className="listTop10">
                            <Item_top10 />
                            <Item_top10 />
                            <Item_top10 />
                            <Item_top10 />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default List_top10