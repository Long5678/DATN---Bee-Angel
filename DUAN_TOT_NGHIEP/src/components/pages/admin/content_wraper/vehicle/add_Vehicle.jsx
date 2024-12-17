import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createCar, getAllVehicle } from "../../../../../redux/action_vehicle";

const AddVehicle = () => {
  let dispatch = useDispatch();
  let vehicleDatas = useSelector((state) => state.vehicleSL.vehicleDatas);
  let isLoadingAddCar = useSelector((state) => state.carSL.isLoadingAddCar);

  const [isPopupVisible, setPopupVisible] = useState(false); // Popup visibility state
  const [namesImg, setNamesImg] = useState([]); // Store image names
  const [description, setDescription] = useState(""); // Store description
  const [type, setType] = useState(""); // Store selected vehicle type
  const [images, setImages] = useState([]); // Store uploaded images
  const [licensePlate, setLicensePlate] = useState([]); // Store selected license plate
  const [valueLicensePlate, setvalueLicensePlate] = useState(""); // Store selected license plate
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // State này để quản lý nút submit
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMes, setErrorMess] = useState("");
 

  const addArrLicensePlate = (value) => {
    if (value.trim() === "") {
      setErrorMess("Biển số xe không được để trống.");
    } else if (licensePlate.includes(value.trim())) {
      setErrorMess("Biển số xe đã tồn tại trong danh sách.");
    } else {
      setErrorMess("");
      setLicensePlate([...licensePlate, value.trim()]);
      setvalueLicensePlate(""); // Xóa nội dung input sau khi thêm
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Toggle popup visibility
  function handlePopup() {
    setPopupVisible(!isPopupVisible);
    setErrorMessage(""); 
  }

   // Handle file input
  //  function changeFileImg(e) {
  //   setNamesImg([...namesImg, e.target.files[0].name]);
  //   setImages([...images, e.target.files[0]]);
  // }


  // Handle file input
  function changeFileImg(e) {
    const file = e.target.files[0];
    if (!file) return;
  
    // Kiểm tra định dạng file
    const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedExtensions.includes(file.type)) {
      setErrorMessage("Chỉ cho phép tải lên các định dạng JPG, JPEG, hoặc PNG.");
      return;
    }
  
    // Kiểm tra kích thước file (giới hạn 2MB)
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxFileSize) {
      setErrorMessage("Kích thước file không được vượt quá 2MB.");
      return;
    }
  
    // Kiểm tra số lượng ảnh đã tải lên
    if (namesImg.length >= 1) {
      setErrorMessage("Bạn chỉ được phép tải lên 1 ảnh.");
      return;
    }
  
    // Nếu hợp lệ, xóa thông báo lỗi và thêm ảnh vào state
    setErrorMessage("");
    setNamesImg([...namesImg, file.name]);
    setImages([...images, file]);
  }
  

  // Fetch vehicle types on mount
  useEffect(() => {
    dispatch(getAllVehicle());
  }, [dispatch]);

  // Handle form submission
  function handleAddCar(data) {
    let { name, motorcycleBrand, price } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("motorcycleBrand", motorcycleBrand);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("price", price);

    images.forEach((image) => {
      formData.append("images", image);
    });
    
    formData.append("licensePlate", JSON.stringify(licensePlate));
    dispatch(createCar(formData));
  }

  // Close popup when the adding process completes
  useEffect(() => {
    if (!isLoadingAddCar) {
      setPopupVisible(false);
    }
  }, [isLoadingAddCar]);

  // useEffect này để theo dõi dữ liệu nhập đủ chưa mới cho submit
  // Watch các trường quan trọng để kích hoạt nút submit
  const formValues = watch(["name", "motorcycleBrand", "price"]);
  useEffect(() => {
    const [name, motorcycleBrand, price] = formValues;
    const isFormValid =
      name &&
      motorcycleBrand &&
      price &&
      type && // Kiểm tra state type
      licensePlate && // Kiểm tra state licensePlate
      description && // Kiểm tra state description
      namesImg.length === 1; // Kiểm tra số lượng ảnh

    setIsSubmitEnabled(!isFormValid); // Nếu form hợp lệ, bật nút submit
  }, [formValues, namesImg, type, licensePlate, description]);

  return (
    <>
      <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
        <div
          className={`box-popop-addtour ${
            isPopupVisible ? "showPopup-addtour" : "nonePopup-addtour"
          }`}
        >
          <form onSubmit={handleSubmit(handleAddCar)}>
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="">Tên Xe</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Tên Xe"
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Hãng xe</label>
                  <input
                    {...register("motorcycleBrand", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Hãng xe"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="">Giá tiền</label>
              <input
                {...register("price", { required: true })}
                type="number"
                className="form-control"
                placeholder="Giá tiền"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Mô tả
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                placeholder="Mô tả"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Chọn ảnh
              </label>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <input
                onChange={(e) => changeFileImg(e)}
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
              <ul className="ul-image-manager">
                {namesImg.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <div className="row">
                <div className="col ">
                  <label htmlFor="">Biển số xe</label>
                  <input
                    onChange={(e) => setvalueLicensePlate(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Biển số"
                  />
                  {errorMes && <p className="text-danger">{errorMes}</p>}
                  <button
                    onClick={() => addArrLicensePlate(valueLicensePlate)}
                    className="btn btn-primary me-2"
                    type="button"
                  >
                    Thêm
                  </button>

                  <ul>
                    {licensePlate.map((item,index) => {
                      return <li key={index}>{item}</li>
                    })}
                  </ul>
                </div>
                <div className="col">
                  <label htmlFor="">Khu vực Xe</label>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Chọn khu vực xe" disabled selected hidden>
                      Chọn khu vực xe
                    </option>
                    {vehicleDatas.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex-btn-add">
              <input
                type="button"
                onClick={handlePopup}
                value="Đóng"
                className="btn btn-primary back"
              />
              <input
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitEnabled}
              />
            </div>
          </form>
        </div>
      </div>

      {isLoadingAddCar && (
        <div className="overlay-await-addTour">
          <div className="loaderAddTour"></div>
          <span className="span-addTour"> Vui lòng đợi ...</span>
        </div>
      )}

      <Button
        onClick={handlePopup}
        className="btn-add-manager"
        variant="contained"
      >
        Thêm Mới
      </Button>
    </>
  );
};

export default AddVehicle;
