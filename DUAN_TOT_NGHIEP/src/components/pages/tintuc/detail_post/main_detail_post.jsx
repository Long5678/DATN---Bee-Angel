import "../../../../publics/styles/tinTuc.scss"
import Header from "../../../layouts/header"
import List_top10 from "../list_top10"
import Box_detail_post from "./box_detail_post"

function Main_detail_post() {
    return <>
        <Header />
        <article className="article_tinTuc">
            <div className="child_article">
                 <Box_detail_post />
                <List_top10 />
            </div>
        </article>
    </>
}

export default Main_detail_post