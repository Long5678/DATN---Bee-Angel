import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

function TourPlaneAdmin({ planes, setPlanes, dateTour, setDateTour, numDay, setNumDay }) {

    // Hàm xử lý khi người dùng thay đổi giá trị input của title hoặc description
    const handleInputChange = (index, field, value) => {
        // const newPlanes = [...planes];
        // newPlanes[index][field] = value;
        // setPlanes(newPlanes);
        setPlanes(prevPlanes => {
            const newPlanes = [...prevPlanes]; // Tạo một bản sao mới
            newPlanes[index] = {
                ...newPlanes[index],
                [field]: value // Cập nhật trường cụ thể
            };
            return newPlanes;
        });
    };

    // Hàm xử lý khi thay đổi giá trị trong ul_lists (activities)
    const handleUlListChange = (planeIndex, listIndex, value) => {
        // const newPlanes = [...planes];
        // newPlanes[planeIndex].ul_lists[listIndex] = value;
        // setPlanes(newPlanes);
        setPlanes(prevPlanes => {
            const newPlanes = [...prevPlanes]; // Tạo một bản sao của planes
            // Cập nhật giá trị ul_lists trong đối tượng plane tương ứng
            newPlanes[planeIndex] = {
                ...newPlanes[planeIndex], // Sao chép đối tượng plane hiện tại
                ul_lists: newPlanes[planeIndex].ul_lists.map((item, idx) =>
                    idx === listIndex ? value : item // Cập nhật item cụ thể
                ),
            };
            return newPlanes; // Trả về bản sao mới
        });
    };
    // Hàm thêm plane mới
    const addPlane = () => {
        setPlanes([...planes, { title: "", description: "", ul_lists: [""] }]);
    };
    // Hàm thêm Activity (ul_list) mới
    const addUlListItem = (planeIndex) => {
        const newPlanes = [...planes];
        newPlanes[planeIndex].ul_lists.push("");
        setPlanes(newPlanes);
    };

    // hàm sử lý lấy được ngày đi
    const onChangeDate = (data) => {
        const departure = new Date(data);
        const numberOfDays = parseInt(numDay, 10) || 0;

        // Tính ngày về bằng cách cộng thêm số ngày vào ngày khởi hành
        const returnDate = new Date(departure);
        returnDate.setDate(departure.getDate() + numberOfDays);

        // Định dạng ngày thành dd/mm/yyyy
        const formattedDepartureDate = `${departure.getDate().toString().padStart(2, '0')}/${(departure.getMonth() + 1).toString().padStart(2, '0')}/${departure.getFullYear()}`;
        const formattedReturnDate = `${returnDate.getDate().toString().padStart(2, '0')}/${(returnDate.getMonth() + 1).toString().padStart(2, '0')}/${returnDate.getFullYear()}`;

        // Kiểm tra xem đã có tour với ngày đi này chưa
        setDateTour(prevDateTour => {
            const tourExists = prevDateTour.find(tour => tour.departureDate === formattedDepartureDate);

            if (tourExists) {
                // Cập nhật tour hiện có với ngày về mới khi thay đổi số ngày
                return prevDateTour.map(tour =>
                    tour.departureDate === formattedDepartureDate
                        ? { ...tour, returnDate: formattedReturnDate }
                        : tour
                );
            } else {
                // Thêm mới nếu chưa có
                return [
                    ...prevDateTour,
                    { departureDate: formattedDepartureDate, returnDate: formattedReturnDate }
                ];
            }
        });


        // const [year, month, day] = data.split("-")
        // const dayMonth = `${day}/${month}`
        // setDateTour([
        //     ...dateTour,
        //     dayMonth
        // ])
    }

    // hàm sử lý remove cái date 
    const removeTourDate = (index) => {
        setDateTour(prevDateTour => prevDateTour.filter((_, i) => i !== index));
    };

    const handleNumDayChange = (e) => {
        const newNumDay = parseInt(e.target.value, 10) || 0;
        setNumDay(newNumDay);

        // Cập nhật lại tất cả ngày về cho các tour đã chọn dựa trên số ngày mới
        setDateTour(prevDateTour =>
            prevDateTour.map(tour => {
                const departure = new Date(tour.departureDate.split('/').reverse().join('-'));
                const returnDate = new Date(departure);
                returnDate.setDate(departure.getDate() + newNumDay);

                // Định dạng lại ngày về
                const formattedReturnDate = `${returnDate.getDate().toString().padStart(2, '0')}/${(returnDate.getMonth() + 1).toString().padStart(2, '0')}/${returnDate.getFullYear()}`;

                return { ...tour, returnDate: formattedReturnDate };
            })
        );
    };


    return <>
        <div className='box-admin-tourPlane'>
            <label htmlFor="">Số ngày</label>
            <br />
            <TextField
                inputProps={{ min: 1 }} 
                size="small"
                type="number"
                value={numDay}
                onChange={handleNumDayChange} // Cập nhật lại khi thay đổi số ngày
            />
            <br />
            <label >Lịch trình</label> <br />

            <TextField
                onChange={(e) => onChangeDate(e.target.value)}
                size="small"
                type="date"
                inputProps={{
                    min: new Date().toISOString().split("T")[0],
                }}
            />
            <ul>
                {dateTour.map((tour, index) => (
                    <li key={index}>
                        Ngày đi: {tour.departureDate} - Ngày về: {tour.returnDate} <span onClick={() => removeTourDate(index)}>xóa</span>
                    </li>
                ))}
            </ul>
        </div>
        <Button onClick={addPlane} variant="outlined">
            Thêm Plane
        </Button>
        <div className='overflow-plane'>
            {planes.map((plane, index) => (
                <div key={index} className='box-admin-tourPlane'>
                    <TextField
                        className="textField-auth text-plane"
                        label={`Title ${index + 1}`}
                        size="small"
                        variant="outlined"
                        value={plane.title}
                        onChange={(e) => handleInputChange(index, "title", e.target.value)}
                    />
                    <TextField
                        className="textField-auth text-plane"
                        label={`Description ${index + 1}`}
                        size="small"
                        variant="outlined"
                        value={plane.description}
                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    />

                    {/* Thêm phần cho Activities */}
                    <div>
                        <Button onClick={() => addUlListItem(index)} variant="outlined">
                            Thêm Activity
                        </Button>
                        {plane.ul_lists.map((listItem, listIndex) => (
                            <div key={listIndex}>
                                <TextField
                                    label={`Activity ${listIndex + 1}`}
                                    size="small"
                                    variant="outlined"
                                    value={listItem || ""}
                                    onChange={(e) => handleUlListChange(index, listIndex, e.target.value)}
                                />
                            </div>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    </>
}

export default TourPlaneAdmin