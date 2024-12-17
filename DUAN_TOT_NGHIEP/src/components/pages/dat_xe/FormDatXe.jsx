import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../../redux/action_thunk";
import "../../../publics/styles/bookCar.scss";
import { useSearchParams } from "react-router-dom";
import { getOneCar } from "../../../redux/action_vehicle";

function FormDatXe() {

  let dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const idCar = searchParams.get("id");
  console.log(idCar);
  const userOne = useSelector((state) => state.userSL.userOne);
  const OneCar = useSelector((state) => state.carSL.carOne);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birth_day, setBirth_day] = useState("");
  const [gender, setGender] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [licensePlate, setLicensePlate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfMotorcycles, setNumberOfMotorcycles] = useState(1); // Default to 1 vehicle
  const [errorMessage, setErrorMessage] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [isPickUpDateSelected, setIsPickUpDateSelected] = useState(false);
  const [isReturnDateSelected, setIsReturnDateSelected] = useState(false);
  const [day, setDay] = useState(0);
  const [frontIDCard, setFrontIDCard] = useState(null); // State cho ảnh mặt trước
  const [backIDCard, setBackIDCard] = useState(null); // State cho ảnh mặt sau
  const [frontIDCardURL, setFrontIDCardURL] = useState(
    localStorage.getItem("frontIDCardURL") || null
  );
  const [backIDCardURL, setBackIDCardURL] = useState(
    localStorage.getItem("backIDCardURL") || null
  );
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);
  const [loadingCar, setLoadingCar] = useState(false);



  const [frontError, setFrontError] = useState(""); // Lỗi cho ảnh mặt trước
  const [backError, setBackError] = useState(""); // Lỗi cho ảnh mặt sau

  useEffect(() => {
    if (
      name &&
      birth_day &&
      email &&
      phone &&
      gender &&
      vehicleName &&
      licensePlate &&
      shippingAddress &&
      numberOfMotorcycles &&
      pickUpDate &&
      returnDate &&
      termsAccepted &&
      ageConfirmed &&
      frontIDCard &&
      backIDCard
    ) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(true);
    }
  }, [
    name,
    birth_day,
    email,
    phone,
    gender,
    vehicleName,
    licensePlate,
    shippingAddress,
    numberOfMotorcycles,
    pickUpDate,
    returnDate,
    termsAccepted,
    ageConfirmed,
    frontIDCard,
    backIDCard,
  ]);

  const handleIDCardChange = (e, type) => {
    const file = e.target.files[0]; // Lấy file đầu tiên từ mảng files
    if (file) {
      const fileType = file.type; // Kiểm tra loại file

      // Kiểm tra định dạng file (JPEG hoặc PNG)
      if (fileType !== "image/jpeg" && fileType !== "image/png") {
        if (type === "front")
          setFrontError("Vui lòng chọn ảnh định dạng JPEG hoặc PNG.");
        if (type === "back")
          setBackError("Vui lòng chọn ảnh định dạng JPEG hoặc PNG.");
        return;
      }

      // Kiểm tra kích thước file (ví dụ: tối đa 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        if (type === "front") setFrontError("Ảnh phải có kích thước dưới 5MB.");
        if (type === "back") setBackError("Ảnh phải có kích thước dưới 5MB.");
        return;
      }

      const fileURL = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh

      const reader = new FileReader(); // Khởi tạo FileReader
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1]; // Chỉ lấy phần dữ liệu base64

        // Tạo đối tượng thông tin tệp
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          data: base64Data, // Lưu dữ liệu base64
        };

        if (type === "front") {
          setFrontIDCard(file); // Cập nhật state với file
          setFrontIDCardURL(fileURL); // Cập nhật state với URL
          localStorage.setItem("fileFrontUrlCar", fileURL);
          localStorage.setItem("fileFrontCar", JSON.stringify(fileInfo)); // Lưu thông tin tệp
          setFrontError(""); // Xóa lỗi khi ảnh hợp lệ
        } else if (type === "back") {
          setBackIDCard(file); // Cập nhật state với file
          setBackIDCardURL(fileURL); // Cập nhật state với URL
          localStorage.setItem("fileBackUrlCar", fileURL);
          localStorage.setItem("fileBackCar", JSON.stringify(fileInfo)); // Lưu thông tin tệp
          setBackError(""); // Xóa lỗi khi ảnh hợp lệ
        }
      };

      reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    } else {
      if (type === "front")
        setFrontError("Vui lòng chọn ảnh định dạng JPEG hoặc PNG.");
      if (type === "back")
        setBackError("Vui lòng chọn ảnh định dạng JPEG hoặc PNG.");
    }
  };

  useEffect(() => {
    if (user && user._id) {
      dispatch(getOneUser(user._id));
    } else {
      console.warn("User is not logged in or user ID is undefined.");
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (userOne) {
      setName(userOne.name || "");
      setPhone(userOne.phone || "");
      setEmail(userOne.email || "");
      setAddress(userOne.address || "");
      setGender(userOne.gender || "");
      setBirth_day(userOne.birth_day || "");
    } else {
      console.warn("User one data is not available.");
    }
  }, [userOne]);

  // Fetch car details based on idCar
  useEffect(() => {
    if (idCar) {
      dispatch(getOneCar(idCar)); // Dispatch action to get car details
    }
  }, [idCar, dispatch]);

  //render tên xe
  useEffect(() => {
    if (OneCar && OneCar.name) {
      setVehicleName(OneCar.name || ""); // Set vehicle name based on fetched car data
    }
  }, [OneCar]);

  const generateLicensePlate = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    let plate = "";

    // Tạo 2 ký tự chữ
    for (let i = 0; i < 2; i++) {
      plate += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Tạo 4 chữ số
    for (let i = 0; i < 4; i++) {
      plate += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return plate;
  };
  //render tên xe
  useEffect(() => {
    if (OneCar && OneCar.licensePlate) {
      setLicensePlate(OneCar.licensePlate || ""); // Set vehicle name based on fetched car data
    }
  }, [OneCar]);

  // Modify the useEffect that calculates the price based on relevant state changes
  useEffect(() => {
    if (pickUpDate && returnDate && shippingAddress) {
      handleCalculatePrice(
        numberOfMotorcycles,
        pickUpDate,
        returnDate,
        shippingAddress,
        licensePlate
      );
    }
  }, [
    numberOfMotorcycles,
    pickUpDate,
    returnDate,
    shippingAddress,
    licensePlate,
  ]);

  // Ensure to call handleCalculatePrice when numberOfMotorcycles changes
  useEffect(() => {
    if (numberOfMotorcycles > 0) {
      // Ensure that number of vehicles is valid
      handleCalculatePrice(
        numberOfMotorcycles,
        pickUpDate,
        returnDate,
        shippingAddress,
        licensePlate
      );
    }
  }, [numberOfMotorcycles]);

  // Hàm tính số ngày thuê
  const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Nếu ngày trả < ngày nhận, trả về 0 (Không hợp lệ)
    if (end < start) return 0;

    // Tính số ngày chênh lệch giữa ngày trả và ngày nhận
    const timeDiff = end - start + 1;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Tính số ngày (chuyển đổi từ milliseconds)

    // Nếu ngày trả và ngày nhận là trùng nhau, tính là 1 ngày
    return daysDiff === 0 ? 1 : daysDiff;
  };
  // useEffect tính toán giá thuê (đã sửa)
  useEffect(() => {
    if (numberOfMotorcycles > 0 && pickUpDate && returnDate) {
      const calculatedDays = calculateDaysBetweenDates(pickUpDate, returnDate); // Sử dụng hàm trên
      // Kiểm tra nếu số ngày hợp lệ và tính giá thuê
      if (calculatedDays > 0) {
        handleCalculatePrice(
          numberOfMotorcycles,
          pickUpDate,
          returnDate,
          shippingAddress,
          calculatedDays,
          licensePlate
        );
        setDay(calculatedDays); // Cập nhật số ngày thuê
      } else {
        setTotalPrice(0); // Ngày không hợp lệ -> tổng tiền bằng 0
        setDay(0);
      }
    } else {
      setTotalPrice(0); // Nếu thiếu thông tin, đặt tổng tiền về 0
      setDay(0);
    }
  }, [numberOfMotorcycles, pickUpDate, returnDate, shippingAddress]);

  useEffect(() => {
    if (numberOfMotorcycles > 0) {
      // Kiểm tra nếu có biển số xe và số lượng biển số có đủ với số lượng xe
      if (
        OneCar &&
        OneCar.licensePlate &&
        OneCar.licensePlate.length >= numberOfMotorcycles
      ) {
        // Nếu có đủ biển số, sao chép và tạo ra số lượng biển số tương ứng với numberOfMotorcycles
        const updatedLicensePlates = [];
        for (let i = 0; i < numberOfMotorcycles; i++) {
          updatedLicensePlates.push(
            OneCar.licensePlate[i % OneCar.licensePlate.length]
          ); // Lặp lại biển số nếu ít hơn số lượng xe
        }
        setLicensePlate(updatedLicensePlates);
        setErrorMessage(""); // Clear error message if enough license plates are available
      } else {
        setErrorMessage(
          "Không có biển số xe nào để chọn. Vui lòng nhập biển số."
        );
        setLicensePlate([]); // Reset license plates if not enough
      }
    }
  }, [numberOfMotorcycles, OneCar]);

  const handlenumberOfMotorcyclesChange = (e) => {
    const numVehicles = Number(e.target.value);
    setNumberOfMotorcycles(numVehicles); // Cập nhật số lượng xe

    // Tạo mảng biển số xe ngẫu nhiên
    const newLicensePlates = [];
    for (let i = 0; i < numVehicles; i++) {
      newLicensePlates.push(generateLicensePlate());
    }

    // Kiểm tra xem số lượng biển số có đủ không
    if (newLicensePlates.length <= OneCar.licensePlate.length) {
      setLicensePlate(newLicensePlates); // Cập nhật biển số xe nếu đủ
    } else {
      setErrorMessage(
        "Không có đủ biển số xe. Vui lòng điều chỉnh số lượng xe."
      );
      setNumberOfMotorcycles(OneCar.licensePlate.length); // Đặt lại số lượng xe nếu không đủ
    }
  };

  // Hàm tính giá thuê (không thay đổi logic nhiều)
  const handleCalculatePrice = async (
    numberOfMotorcycles,
    pickUpDate,
    returnDate,
    shippingAddress
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/vehicle-price/${idCar}`,
        {
          numberOfMotorcycles,
          pickUpDate,
          returnDate,
          shippingAddress,
        }
      );
      setTotalPrice(response.data.totalPrice); // Cập nhật tổng tiền
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
      setTotalPrice(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra các trường thông tin
    setLoadingCar(true);
    if (
      !name ||
      !email ||
      !birth_day ||
      !gender ||
      !phone ||
      !vehicleName ||
      !pickUpDate ||
      !returnDate ||
      !address ||
      !numberOfMotorcycles ||
      !termsAccepted ||
      !ageConfirmed ||
      !shippingAddress
    ) {
      setErrorMessage(
        "Vui lòng điền đầy đủ thông tin và đồng ý với các điều khoản."
      );
      setLoadingCar(false);
      return;
    }

    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("vehicleName", vehicleName);
    localStorage.setItem("licensePlate", JSON.stringify(licensePlate));
    localStorage.setItem("numberOfMotorcycles", numberOfMotorcycles);
    localStorage.setItem("pickUpDate", pickUpDate); // Store pick-up date
    localStorage.setItem("returnDate", returnDate); // Store return date
    localStorage.setItem("shippingAddress", shippingAddress);

    window.location.href = `/thanhtoanxe?id=${idCar}&carnumber=${numberOfMotorcycles}&pickupdate=${pickUpDate}&returndate=${returnDate}&shippingaddress=${shippingAddress}&licensePlate=${licensePlate}`;
    setErrorMessage("");
  };

  const handlePayFull = (e) => {
    localStorage.setItem("paymentType", "full");
    handleSubmit(e);
  };
  const formatDateToYYYYMMDD = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Tháng 0-11
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const defaultPickUpDate = formatDateToYYYYMMDD(new Date()); // Giá trị mặc định cho ngày đón xe
  const defaultReturnDate = ""; // Giá trị mặc định cho ngày trả xe (có thể thay đổi theo nhu cầu)

  // Thiết lập ngày đón xe mặc định khi khởi tạo
  useEffect(() => {
    const today = new Date();
    setPickUpDate(defaultPickUpDate); // Sử dụng giá trị mặc định cho ngày đón xe
    setReturnDate(defaultReturnDate); // Thiết lập ngày trả xe mặc định
  }, []);


  useEffect(() => {
    // Lấy giá trị totalPrice từ localStorage nếu có
    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice) {
      setTotalPrice(Number(storedTotalPrice));
    }
  }, []);

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      // Cuộn tới phần tử cụ thể với hiệu ứng mượt
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error("listRef chưa được gắn với phần tử nào!");
    }

    // Cuộn lên đầu trang khi component được mount
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []); // Chạy khi component được mount



  return (
    <>
      {loadingCar && (
        <div className="overlay-await-bookCar">
          <div className="loaderBookCar"></div>
          <span className="span-bookCar"> Vui lòng đợi ...</span>
        </div>
      )}
      <section ref={listRef} className="both-main-form-bookCar">
        <form onSubmit={handleSubmit}>
          <section className="main_form-bookCar">
            <h2>Điền thông tin</h2>

            <div className="mb-3">
              <label className="form-label">Họ và tên</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly
                type="text" // Changed from 'email' to 'text'
                className="form-control"
                placeholder="Họ và tên"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
                type="email"
                className="form-control"
                placeholder="email"
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Ngày sinh</label>
                <input
                  value={birth_day}
                  onChange={(e) => setBirth_day(e.target.value)}
                  readOnly
                  type="text"
                  className="form-control"
                  placeholder="Ngày sinh"
                />
              </div>
              <div className="col">
                <label className="form-label">Giới tính</label>
                <input
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  readOnly
                  type="text"
                  className="form-control"
                  placeholder="Giới tính"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col">
                <label className="form-label">Số điện thoại</label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    +84
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly
                    type="tel"
                    className="form-control"
                    placeholder="Điện thoại"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Loại xe đã chọn</label>
                <input
                  readOnly
                  value={vehicleName}
                  type="text"
                  className="form-control"
                  placeholder="Xe đã chọn"
                />
              </div>
              <div className="col">
                <label className="form-label">Số lượng xe</label>
                <input
                  type="number"
                  value={numberOfMotorcycles}
                  onChange={handlenumberOfMotorcyclesChange}
                  className="form-control"
                  min="1"
                  max="20"
                  placeholder="Số lượng xe"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Ngày nhận xe</label>
                <input
                  onChange={(e) => {
                    setPickUpDate(e.target.value);
                    setIsPickUpDateSelected(true); // Đánh dấu là đã chọn ngày
                  }}
                  type="date"
                  className="form-control"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="col">
                <label className="form-label">Ngày trả xe</label>
                <input
                  onChange={(e) => {
                    setReturnDate(e.target.value);
                    setIsReturnDateSelected(true); // Đánh dấu là đã chọn ngày
                  }}
                  type="date"
                  className="form-control"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-blue">Số ngày: {day}</label>
            </div>

            <div className="row">
              {/*  */}
              <div className="col">
                <div className="form-group">
                  <label>Ảnh bằng lái xe (Mặt trước)</label> <br />
                  <input
                    type="file"
                    id="frontCardBook"
                    accept="image/*"
                    onChange={(e) => handleIDCardChange(e, "front")}
                  />
                  <label className="lable-forCCCD" htmlFor="frontCardBook">
                    {frontIDCard ? (
                      <div className="box-img-cccd">
                        <img src={frontIDCardURL} alt="" />
                      </div>
                    ) : (
                      <div className="box-cccd">
                        <div className="d-flex-cccd">
                          <i className="fa-solid fa-cloud-arrow-up fa-xl"></i>
                          <span>Đưa ảnh vào đây</span>
                        </div>
                      </div>
                    )}
                  </label>
                  {frontError && <p className="text-danger">{frontError}</p>}
                </div>
              </div>

              <div className="col">
                {/* Trường ảnh căn cước công dân mặt sau */}
                <div className="form-group">
                  <label>Ảnh bằng lái xe (Mặt sau)</label> <br />
                  <input
                    type="file"
                    id="backCardBook"
                    accept="image/*"
                    onChange={(e) => handleIDCardChange(e, "back")}
                  />
                  <label className="lable-forCCCD" htmlFor="backCardBook">
                    {backIDCard ? (
                      <div className="box-img-cccd">
                        <img src={backIDCardURL} alt="" />
                      </div>
                    ) : (
                      <div className="box-cccd">
                        <div className="d-flex-cccd">
                          <i className="fa-solid fa-cloud-arrow-up fa-xl"></i>
                          <span>Đưa ảnh vào đây</span>
                        </div>
                      </div>
                    )}
                  </label>
                  {backError && <p className="text-danger">{backError}</p>}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Địa chỉ</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly
                type="text"
                className="form-control"
                placeholder="Địa chỉ"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="form-label">Biển số xe</label>
              <input
                value={licensePlate.join(", ")}
                onChange={(e) => setLicensePlate(e.target.value)}
                readOnly
                className={`form-control ${errorMessage ? "is-invalid" : ""}`} // Thêm lớp "is-invalid" khi có lỗi
              />
              {/* Hiển thị thông báo lỗi nếu có */}
            </div>

            <div className="mb-3">
              <label htmlFor="form-label">Địa chỉ giao xe</label>
              <input
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Địa chỉ giao xe"
              />
            </div>

            <div className="d-flex-total">
              <div className="total-price-tour">
                <span className="text-total">Tổng tiền :</span>
                <span className="price-tour">
                  {totalPrice > 0 ? totalPrice.toLocaleString("vi-VN") : "0"}{" "}
                  <sup>đ</sup>
                </span>
                <br />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
            </div>
          </section>

          <div className="checkbox-group-form">
            <input
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              type="checkbox"
              id="terms1"
              required
            />
            <label htmlFor="terms1">
              Tôi đồng ý điều khoản mà website đưa ra
            </label>
          </div>

          <div className="checkbox-group-form">
            <input
              checked={ageConfirmed}
              onChange={() => setAgeConfirmed(!ageConfirmed)}
              type="checkbox"
              id="terms2"
              required
            />
            <label htmlFor="terms2">Tôi đã 18 tuổi và có bằng lái xe</label>
          </div>

          <button
            type="button"
            disabled={isSubmitEnabled}
            onClick={handlePayFull}
            className={`btn-thanhtoan ${isSubmitEnabled && "btn-notSubmit"}`}
            required
          >
            Thanh toán
          </button>
        </form>
      </section>
    </>
  );
}

export default FormDatXe;
