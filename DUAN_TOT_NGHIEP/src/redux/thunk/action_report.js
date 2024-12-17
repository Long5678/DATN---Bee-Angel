import axios from 'axios'
import{
  loadAllReport,
  loadAllRevenue,
  loadoneReport,
  delOneReport,
  errOrder,
  loadRevenueDetails,
  setTotalYearRevenue,
} from '../report_slice'


export function getAllTotalOrderReport() {
  return async (dispatch) => {
      try {
         

          let res = await axios.get(`http://localhost:3000/report/total-orders`)
          // console.log(res.data);
          
          dispatch(loadAllReport(res.data))
      } catch (error) {
          console.log(error);
      }

  }
}

export function fetchTotalOrderPercentageReport() {
  return async (dispatch) => {
      try {
         

          let res = await axios.get(`http://localhost:3000/report/calculate-total-percentage`)
         
          if (res && res.data) {
            dispatch(loadoneReport(res.data))
          }else{
            console.error('Dữ liệu không hợp lệ', response);
          }
      } catch (error) {
        console.error('Lỗi khi lấy báo cáo tổng tỷ lệ phần trăm:', error);
      }

  }
}

export function fetchRevenueByYear (year) {
 return async (dispatch) => {
  try {
    const res= await axios.post("http://localhost:3000/report/revenue", { year });
    console.log(res.data.totalYearRevenue);
    console.log(res.data.revenueByQuarter);
    if (res && res.data) {
      dispatch(setTotalYearRevenue(res.data.totalYearRevenue));
      dispatch(loadAllRevenue(res.data.revenueByQuarter));
    } else {
      dispatch(errOrder("Không có dữ liệu trả về"));
    }
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu doanh thu theo năm:', error);
  }
 }
}


export const fetchRevenueList = (year) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/report/revenue/list", { year });
    if (response && response.data) {
      dispatch(loadAllRevenue(response.data.revenueList));
    } else {
      dispatch(errOrder("Không có dữ liệu trả về"));
    }
  } catch (error) {
    console.error('Lỗi khi tải danh sách doanh thu:', error);
  }
};

 