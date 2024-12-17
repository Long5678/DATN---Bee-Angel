import { useState, useEffect, useRef } from "react";
import List_orderHTY from "./list_orderHTY";
import { errOrder } from "../../../../redux/order_slice";
import { useDispatch } from "react-redux";

function HistoryOrder() {
  let dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(0); // Store the active tab, default is the first tab
  const tabs = ['Chờ xác nhận', 'Sẵn sàng khởi hành', 'Đang diễn ra', 'Hoàn tất', 'Đã hủy'];

  const tabRefs = useRef([]); // Ref to store the position of tabs

  const [lineStyle, setLineStyle] = useState({
    width: 0,
    transform: 'translateX(0)', // Use transform instead of left
  });

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      // Get the position and size of the active tab
      const currentTab = tabRefs.current[activeTab].getBoundingClientRect();
      const firstTab = tabRefs.current[0].getBoundingClientRect(); // Get info about the first tab
      const translateXValue = currentTab.left - firstTab.left; // Calculate the translateX value

      setLineStyle({
        width: currentTab.width, // Update width according to the active tab
        transform: `translateX(${translateXValue}px)`, // Use translateX for smooth animation
      });
    }
  }, [activeTab]);


  const handleClickTab = (i) => {
    dispatch(errOrder(""))
    setActiveTab(i)
  }

  return (
    <>
      <section className="main_historyOrder">
        <section className="head_tab">
          {tabs.map((item, index) => {
            return (
              <span
                ref={el => (tabRefs.current[index] = el)} // Assign ref to each tab
                onClick={() => handleClickTab(index)}
                key={index}
                className={activeTab === index ? 'active-tab' : ''}
              >
                {item}
              </span>
            );
          })}
        </section>
        <div className="line-tab" style={{ width: lineStyle.width, transform: lineStyle.transform }}></div>

        {/* Pass activeTab to List_orderHTY to filter orders based on the selected tab */}
        <List_orderHTY activeTabStatus={tabs[activeTab]} setActiveTab={setActiveTab} />

      </section>
    </>
  );
}

export default HistoryOrder;
