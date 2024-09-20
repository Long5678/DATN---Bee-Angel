import "../../../publics/styles/tinTuc.scss"
import Header from "../../layouts/header"
import List_post from "./list_post"
import List_top10 from "./list_top10"

function Main_tinTuc() {
    return <>
        <Header />
        <article className="article_tinTuc">
            <div className="child_article">
                <List_post />
                <List_top10 />
            </div>
        </article>
    </>

}

export default Main_tinTuc