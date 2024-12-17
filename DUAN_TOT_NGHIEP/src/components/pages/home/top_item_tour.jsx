import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Top_item_tour() {

    const [topTours, setTopTours] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách top tours
        axios.get('http://localhost:3000/Admin/tours/get-top-tour')
            .then(response => {
                // const sortedTours = response.data.sort((a, b) => b.bookingsCount - a.bookingsCount); // Sắp xếp giảm dần
                setTopTours(response.data.data); // Lấy 3 tour hàng đầu
                console.log('TopTOur:', response.data);

            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }, []);

    return <>
    {/* 2 */}
        <div className="top-item-tour update-top-item-tour ">
            <div className="count-top">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-2-circle svg-top2" viewBox="0 0 16 16">
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306" />
                </svg>
            </div>
            <div className="ribbon-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                </svg>
            </div>
            <div className="ribbon-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                </svg>
            </div>

            <div className="box-top-item">
                <div className="tour-image-block update-image-top ">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${topTours[1]?.images[0]}?alt=media`} alt="Đại Nội Huế" className="tour-image" />
                </div>
                <div className="tour-info">

                    <h2 className="tour-title">{topTours[1]?.name}</h2>
                    <p className="tour-description">{topTours[1]?.description}</p>
                </div>
            </div>
        </div>


{/*  */}
        <div className="top-item-tour box-top1-tour">
            <div className="count-top">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-1-circle svg-top1" viewBox="0 0 16 16">
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z" />
                </svg>
            </div>
            <div className="ribbon-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                </svg>
            </div>
            <div className="ribbon-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                </svg>
            </div>

            <div className="box-top-item">
                <div className="tour-image-block">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${topTours[0]?.images[0]}?alt=media`} alt="Đại Nội Huế" className="tour-image" />
                </div>
                <div className="tour-info">

                    <h2 className="tour-title">{topTours[0]?.name}</h2>
                    <p className="tour-description">{topTours[0]?.description}</p>
                </div>
            </div>
        </div>

{/*  */}
        <div className="top-item-tour update-top-item-tour">
            <div className="count-top">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-3-circle svg-top3" viewBox="0 0 16 16">
                    <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318" />
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8" />
                </svg>
            </div>
            <div className="ribbon-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                </svg>
            </div>
            <div className="ribbon-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                </svg>
            </div>


            <div className="box-top-item">
                <div className="tour-image-block update-image-top">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${topTours[2]?.images[0]}?alt=media`} alt="Đại Nội Huế" className="tour-image" />
                </div>
                <div className="tour-info">

                    <h2 className="tour-title">{topTours[2]?.name}</h2>
                    <p className="tour-description">{topTours[2]?.description}</p>
                </div>
            </div>
        </div>
    </>
}

export default Top_item_tour
