import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

function TourPlaneAdmin({ planes, setPlanes, dateTour, setDateTour }) {

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
        const [year, month, day] = data.split("-")
        const dayMonth = `${day}/${month}`
        setDateTour([
            ...dateTour,
            dayMonth
        ])
    }

    // hàm sử lý remove cái date 
    const removeStateDateTour = (index) => {
        const updateDateTour = dateTour.filter((_, i) => i !== index)
        setDateTour(updateDateTour)
    }

    useEffect(() => {
       console.log("date", dateTour);
       
    }, [dateTour])

    return <>
        <div className='box-admin-tourPlane'>
            <label >Lịch trình</label> <br />
            <TextField onChange={(e) => onChangeDate(e.target.value)} size="small" type='date' />
            <div className='listDateTour'>
                 {dateTour.map((item, index) => {
                     return <div key={index} className='boxDateTour'>{item}<span><i onClick={() => removeStateDateTour(index)} className="fa-regular fa-circle-xmark"></i></span></div>
                 })}
            </div>
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