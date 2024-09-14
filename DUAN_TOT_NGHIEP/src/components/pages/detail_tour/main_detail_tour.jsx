import Header from "../../layouts/header"
import Detail_tour from "./detail_tour"
import Plane_tour from "./plane_tour"
import Comment_tour from "./comment_tour"
import "../../../publics/styles/detail_tour.scss"

function Main_detail_tour() {
  return <>
    <Header />
    <div className="boxMain-detail-tour">
      <Detail_tour />
      <Plane_tour />
      <Comment_tour />
    </div>
  </>
}

export default Main_detail_tour
