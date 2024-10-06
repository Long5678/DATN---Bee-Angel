import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTourByNameAnDateTour } from "../../../../../redux/action_thunk";
function Search_TourManager() {
    let dispatch = useDispatch()
    const [name, setName] = useState("");
    const dateTour = "";
    // let tourDatas = useSelector((state) => state.tourSL.tourDatas)

    useEffect(() => {
        dispatch(getTourByNameAnDateTour(name, dateTour))
    }, [name])
    return <>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid box-search" style={{ justifyContent: "flex-end" }}>
                <form className="d-flex" role="search">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-danger" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </>
}

export default Search_TourManager