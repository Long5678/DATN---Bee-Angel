import { useState, useEffect, useRef } from "react";
import "../../../../publics/styles/details-order.scss";
import { useDispatch } from "react-redux";
import { errOrderVehicle } from "../../../../redux/ordervehicle_slice";
import List_orderHTY_Vehicle from "./list_orderHTY_Vehicle";
function HistoryOrder_Vehicle() {
  let dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0); // Lưu trữ tab đang được chọn, mặc định là tab đầu tiên
  const tabsCar = ["Chờ xác nhận", "Đặt xe thành công", "Đang diễn ra", "Hoàn tất", "Đã hủy"];

  const tabRefs = useRef([]); // Tạo ref để lưu trữ vị trí của các tab

  const [lineStyle, setLineStyle] = useState({
    width: 0,
    transform: "translateX(0)", // Sử dụng transform thay vì left
  });

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      // Lấy vị trí và kích thước của tab đang được chọn
      const currentTab = tabRefs.current[activeTab].getBoundingClientRect();
      const firstTab = tabRefs.current[0].getBoundingClientRect(); // Thông tin về tab đầu tiên
      const translateXValue = currentTab.left - firstTab.left; // Tính toán giá trị translateX

      setLineStyle({
        width: currentTab.width, // Cập nhật độ rộng theo tab
        transform: `translateX(${translateXValue}px)`, // Sử dụng giá trị translateX
      });
    }
  }, [activeTab]);

  const onClickTabOrderCar = (i) => {
    setActiveTab(i);
    dispatch(errOrderVehicle(""));
  };

  return (
    <>
      <section className="main_historyOrder">
        <section className="head_tab">
          {tabsCar.map((item, index) => {
            return (
              <span
                ref={(el) => (tabRefs.current[index] = el)} // Gán ref cho mỗi tab
                onClick={() => onClickTabOrderCar(index)}
                key={index}
                className={activeTab === index ? "active-tab" : ""}
              >
                {item}
              </span>
            );
          })}
        </section>
        <div
          className="line-tab"
          style={{ width: lineStyle.width, transform: lineStyle.transform }}
        ></div>

        <List_orderHTY_Vehicle activeTab={tabsCar[activeTab]} setActiveTab={setActiveTab} />
      </section>
    </>
  );
}

export default HistoryOrder_Vehicle;
