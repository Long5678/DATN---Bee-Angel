import React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function List_Home({ weeks, tourData, carData }) {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10px",
    }}
  >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#Id</StyledTableCell>
            <StyledTableCell>Tháng</StyledTableCell>
            <StyledTableCell align="right">Tour (VND)</StyledTableCell>
            <StyledTableCell align="right">Car (VND)</StyledTableCell>
            <StyledTableCell align="right">Tổng cộng (VND)</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, index) => (
            <StyledTableRow key={week}>
              <StyledTableCell>#ID{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {week}
              </StyledTableCell>
              <StyledTableCell align="right">
                {tourData[index].toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {carData[index].toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {(tourData[index] + carData[index]).toLocaleString()}
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  style={{ marginRight: "5px", width: "70px" }}
                >
                  Details
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  style={{ width: "70px" }}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}
