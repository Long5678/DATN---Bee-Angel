import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../../../publics/styles/datTour.scss";
import Celander from "./celander";

function TourDetail() {
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id"); // Get the id from the URL
    const arrTG = ["2N1D", "2N3D", "1 Tuần"];

    // State to store the selected checkbox duration
    const [selectedDuration, setSelectedDuration] = useState(arrTG[0]);

    // State to store tour details fetched from the API
    const [tourDetails, setTourDetails] = useState(null);

    // Fetch tour data by ID using axios
    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Admin/tours/detail/${idTour}`); // Mock API call
                setTourDetails(response.data); // Set tour details in state
            } catch (error) {
                console.error("Error fetching tour details:", error);
            }
        };

        if (idTour) {
            fetchTourDetails();
        }
    }, [idTour]);

    const handleCheck = (value) => {
        setSelectedDuration(value === selectedDuration ? "" : value);
    };

    let datas = arrTG.map((item, index) => (
        <label key={index}>
            <input
                type="checkbox"
                checked={selectedDuration === item}
                onChange={() => handleCheck(item)}
                value={item}
            />
            {item}
        </label>
    ));

    // If tour details haven't loaded yet, show a loading message
    if (!tourDetails) {
        return <div>Loading tour details...</div>;
    }

    return (
        <>
            <div className="div-box-tourDetail-right">
                <div className="tour-details-card">
                    <div className="tour-image-details">
                        <img
                            src={tourDetails.image || "https://cdn.media.dulich24.com.vn/diemden/kinh-thanh-hue-5562/kinh-thanh-hue.jpg"}
                            alt={tourDetails.name || "Tour Image"}
                        />
                    </div>
                    <div className="tour-info">
                        <div className="tour-header">
                            <div className="tour-rating">
                                <i className="fa-solid fa-star"></i>
                                <span>{tourDetails.rating || "5.0"}</span>
                            </div>
                            <div className="tour-location">
                                <i className="fa-solid fa-location-dot"></i>
                                <span>{tourDetails.location || "Unknown Location"}</span>
                            </div>
                        </div>
                        <h3>{tourDetails.name || "Tour Name"}</h3>
                        <p className="p_tourInfo">
                            {tourDetails.description || "Tour description will be displayed here."}
                        </p>
                        <div className="tour-duration">
                            {datas}
                        </div>
                        <div className="tour-price-thanhToan">
                            <span className="price-name">Price</span>
                            <span className="price-amount">{tourDetails.price || "1.500.000"} VND</span>
                        </div>
                    </div>
                </div>
                <Celander />
            </div>
        </>
    );
}

export default TourDetail;
