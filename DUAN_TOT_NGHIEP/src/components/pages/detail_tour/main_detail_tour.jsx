import Header from "../../layouts/header"
import Detail_tour from "./detail_tour"
import Plane_tour from "./plane_tour"
import CommentSection from "../comment/CommentSection"
import "../../../publics/styles/detail_tour.scss"
import { getOneTour } from "../../../redux/action_thunk";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function Main_detail_tour() {
  // lấy id từ url
  const [searchParams] = useSearchParams();
  const idTour = searchParams.get("id"); // Lấy token từ URL
  let dispatch = useDispatch()
  let tourOne = useSelector((state) => state.tourSL.tourOne)

  useEffect(() => {
    if (idTour) {
      dispatch(getOneTour(idTour))
    }
    // Cuộn lên đầu trang khi component render
    window.scrollTo(0, 0);
  }, [idTour])

  // console.log("Tour one", tourOne);


  return <>
    <Header />
      <div className="boxMain-detail-tour">
        <Detail_tour {...tourOne} />
        <Plane_tour  {...tourOne} />
        <CommentSection />
      </div>

  </>
}

export default Main_detail_tour
