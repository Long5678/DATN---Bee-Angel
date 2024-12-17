import React, { useContext, useEffect, useState } from "react";

import Page_Vehicle from "./page_Vehicle";
import ItemVehicle from "./item_Vehicle";
import Search_Vehicle from "./search_Vehicle";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../../../context/authContext";
import { getAllCar, getAllVehicle } from "../../../../../redux/action_vehicle";

const ListVehicle = () => {
  let dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  let carDatas = useSelector((state) => state.carSL.carDatas);

  // Update search query when the user types in the search input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  // sử dụng effect để gửi action đến getAllDanhMuc
  useEffect(() => {
    dispatch(getAllVehicle());
  }, [user]);

  useEffect(() => {
    dispatch(getAllCar());
  }, [user]);

  // Filter blogs based on the search query
  const filteredVehicle = carDatas.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Map through the filtered blogs
  const data = filteredVehicle.map((item, index) => (
    <ItemVehicle key={index} {...item} i={index} />
  ));

  return (
    <>
      <Search_Vehicle onSearch={handleSearch} />
      <div className="table-danhMuc">
        <table className="table">
          <thead>
            <tr>
              <th className="center-th" scope="col">
                #
              </th>
              <th scope="col">Tên Xe</th>
              <th scope="col">Hãng Xe</th>
              <th scope="col">Giá tiền</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {/* {carDatas.map((item, index) => {
            return <ItemVehicle key={index} {...item} i={index} />
            })} */}
            {data.length > 0 ? (
              data
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  {searchQuery.trim()
                    ? "Không tìm thấy kết quả."
                    : "Không có dữ liệu."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Page_Vehicle />
    </>
  );
};

export default ListVehicle;
