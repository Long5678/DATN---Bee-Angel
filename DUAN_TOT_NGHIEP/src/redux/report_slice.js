import {
  createSlice
} from "@reduxjs/toolkit"

const initialState = {
  reportDatas: [],
  allRevenue: [],
  oneReport: {},
  revenueDetails: null,
  totalYearRevenue: 0,
  isErrReport: "",
};

export const reportSlice = createSlice({
  name: "reportSL",
  initialState,
  reducers: {
      loadAllReport(state, action) {
          state.reportDatas = action.payload;
      },
      loadAllRevenue(state, action) {
        state.allRevenue = action.payload;
      },
      loadoneReport(state, action) {
          state.oneReport = action.payload;
      },
      delOneReport(state, action) {
          state.reportDatas = state.reportDatas.filter((item) => {
              return item._id != action.payload
          })
      },

      updateOneReport(state, action) {
          const index = state.reportDatas.findIndex((item) => item._id === action.payload._id);
          if (index !== -1) {
              state.reportDatas[index] = action.payload;
          }
      },
      loadRevenueDetails(state, action) {
        state.revenueDetails = action.payload;
      },
      setTotalYearRevenue(state, action) {
        state.totalYearRevenue = action.payload;
      },
      errOrder(state, action) {
          state.isErrReport = action.payload;
      },

  }
})


export const {
  loadAllReport,
  loadoneReport,
  delOneReport,
  updateOneReport,
  errOrder,
  loadRevenueDetails,
  setTotalYearRevenue,
  loadAllRevenue
} = reportSlice.actions;
