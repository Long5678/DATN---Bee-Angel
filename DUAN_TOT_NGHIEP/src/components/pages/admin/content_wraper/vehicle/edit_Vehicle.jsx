import { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../../../context/popupContext";
import { useDispatch, useSelector } from "react-redux";
import { updateCar } from "../../../../../redux/action_vehicle";

const EditVehicle = () => {
  let dispatch = useDispatch();
  let vehicleDatas = useSelector((state) => state.vehicleSL.vehicleDatas);
  let carOne = useSelector((state) => state.carSL.carOne);
  let isLoadingAddCar = useSelector((state) => state.carSL.isLoadingAddCar);
  const { isPopupEditCars, setPopupEditCars } = useContext(PopupContext);
  const [errorMessage, setErrorMessage] = useState("");
  function handlePopup() {
    setPopupEditCars(!isPopupEditCars);
    setErrorMessage("");
  }
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);
  const [name, setName] = useState("");
  const [motorcycleBrand, setMotorcycleBrand] = useState("");
  const [licensePlate, setLicensePlate] = useState([]);
  const [type, setType] = useState(""); // state này để lấy danh mục xe
  const [price, setPrice] = useState("");
  const [namesImg, setNamesImg] = useState([]); // state này lưu trữ các tên ảnh để list ra li
  const [description, setDescription] = useState(""); // state này để lấy mô tả
  const [images, setImages] = useState([]); // state này để lấy các file ảnh
  const [existingImages, setExistingImages] = useState([]); // Danh sách ảnh cũ
  const [valueLicensePlate, setvalueLicensePlate] = useState(""); // Store selected license plate
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
  useEffect(() => {
    if (carOne) {
      setName(carOne.name || "");
      setMotorcycleBrand(carOne.motorcycleBrand || "");
      // setLicensePlate(carOne.licensePlate || []); // Đảm bảo licensePlate được lấy từ carOne
      setImages(carOne.images || []);
      setType(carOne.type || null);
      setDescription(carOne.description || "");
      setNamesImg(carOne.images || []);
      setExistingImages(carOne.images || []);
      setPrice(carOne.price || "");
      setLicensePlate(
        Array.isArray(carOne.licensePlate) ? carOne.licensePlate : []
      );
    }
  }, [carOne]);

  function handleUpdateCar() {
    if (images.length === 0) {
      setErrorMessage("Vui lòng tải lên ít nhất một ảnh.");
      return;
    }

    console.log(
      name,
      images,
      motorcycleBrand,
      licensePlate,
      description,
      price,
      type
    );
    const formData = new FormData();
    formData.append("name", name);
    formData.append("motorcycleBrand", motorcycleBrand);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("existingImages", JSON.stringify(existingImages));
    formData.append("licensePlate", JSON.stringify(licensePlate));
    images.forEach((image) => {
      formData.append(`images`, image);
    });

    dispatch(updateCar(carOne._id, formData));
  }

  function changeFileImg(e) {
    const file = e.target.files[0]; // Chỉ lấy file đầu tiên
    const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"]; // Định dạng hợp lệ
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    // Kiểm tra xem đã chọn ảnh chưa và nếu đã có ảnh thì không cho chọn thêm
    if (namesImg.length >= 1) {
      setErrorMessage("Bạn chỉ được phép tải lên 1 ảnh.");
      return;
    }

    if (!file) {
      setErrorMessage("Vui lòng chọn một file hợp lệ.");
      return;
    }

    // Kiểm tra định dạng
    if (!allowedExtensions.includes(file.type)) {
      setErrorMessage("Định dạng không hợp lệ. Chỉ chấp nhận JPG, PNG.");
      return;
    }

    // Kiểm tra kích thước
    if (file.size > maxFileSize) {
      setErrorMessage("File vượt quá kích thước cho phép (tối đa 2MB).");
      return;
    }

    // Nếu hợp lệ, cập nhật lại tên ảnh và file
    setErrorMessage(""); // Xóa thông báo lỗi
    setNamesImg([file.name]); // Cập nhật tên file
    setImages([file]); // Cập nhật file duy nhất
  }

  // function changeFileImg(e) {
  //   const files = Array.from(e.target.files); // Chuyển đổi NodeList thành mảng
  //   const newNames = files.map((file) => file.name); // Lấy tên các file mới

  //   setNamesImg(newNames); // Cập nhật tên ảnh
  //   setImages(files); // Cập nhật mảng các file ảnh mới
  // }
  // Theo dõi thay đổi của isLoadingAddCar
  useEffect(() => {
    if (!isLoadingAddCar) {
      // Kiểm tra khi quá trình thêm hoàn tất và thành công
      setPopupEditCars(false); // Đóng popup
    }
  }, [isLoadingAddCar]);
  // Hàm xóa phần tử theo index
  function removeStateImg(index, name) {
    const updatedNameimg = namesImg.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
    const updatedImages = images.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
    setImages(updatedImages); // Cập nhật lại state
    setNamesImg(updatedNameimg); // Cập nhật lại state

    setExistingImages(existingImages.filter((img) => img !== name)); // Xóa ảnh mà người dùng muốn xóa
  }

  function removeStateLicensePlate(index, value) {
    const updatedLicensePlate = licensePlate.filter((_, i) => i !== index); // Remove item at index
    setLicensePlate(updatedLicensePlate); // Update state
  }


   // useEffect này để theo dõi dữ liệu nhập đủ chưa mới cho submit
   useEffect(() => {
    if (name && price && motorcycleBrand && namesImg.length >= 1 && type && description) {
        setIsSubmitEnabled(false);
    } else {
        setIsSubmitEnabled(true);
    }
}, [name, price, motorcycleBrand, namesImg, type, description]);

  return (
    <>
      <div className={`${isPopupEditCars ? "overlay-admin" : ""}`}>
        <div
          className={`box-popop-addcar ${
            isPopupEditCars ? "showPopup-addcar" : "nonePopup-addcar"
          }`}
        >
          <div className="mb-3">
            <div className="row">
              <div className="col">
                <label htmlFor="">Tên Xe</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="form-control"
                  placeholder="Tên Xe"
                />
              </div>
              <div className="col">
                <label htmlFor="">Hãng xe</label>
                <input
                  onChange={(e) => setMotorcycleBrand(e.target.value)}
                  value={motorcycleBrand}
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
              onChange={(e) => setPrice(e.target.value)}
              value={price}
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
              value={description}
              className="form-control"
              name=""
              id=""
              placeholder="Mô tả"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">
              Chọn ảnh
            </label>
            <input
              onChange={(e) => changeFileImg(e)}
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <ul className="ul-image-manager">
              <ul className="ul-image-manager">
                {namesImg.map((name, index) => (
                  <li key={index}>
                    {name}
                    <span
                      className="span-close"
                      onClick={() => removeStateImg(index, name)}
                    >
                      <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                  </li>
                ))}
              </ul>
            </ul>
          </div>

          <div className="mb-3">
            <div className="row">
              <div className="col">
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
                  {Array.isArray(licensePlate) &&
                    licensePlate.map((item, index) => (
                      <li key={index}>
                        {item}
                        <span
                          className="span-close"
                          onClick={() => removeStateLicensePlate(index, item)} // Pass the index and value
                        >
                          <i className="fa-regular fa-circle-xmark"></i>
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="col">
                <label htmlFor="">Khu vực Xe</label>
                <select
                  onChange={(e) => setType(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Chọn khu vực xe" disabled selected hidden>
                    Chọn khu vực xe
                  </option>
                  {vehicleDatas.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
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
              onClick={handleUpdateCar}
              type="button"
              className="btn btn-primary"
              value="Cập nhật"
              disabled={isSubmitEnabled}
            />
          </div>
        </div>
      </div>

      {isLoadingAddCar && (
        <div className="overlay-await-addCar">
          <div className="loaderAddCar"></div>
          <span className="span-addCar"> Vui lòng đợi ...</span>
        </div>
      )}
    </>
  );
};

export default EditVehicle;
