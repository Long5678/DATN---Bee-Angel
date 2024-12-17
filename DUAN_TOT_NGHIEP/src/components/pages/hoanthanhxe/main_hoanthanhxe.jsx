import React, { useState, useEffect } from "react";
import Header from "../../layouts/header";
import '../../../publics/styles/BookingSuccess.scss'
import BookingCarSuccess from "./view_thanhtoanxe";

function Main_hoanthanhxe() {
    return (
      <>
        <Header />
          <BookingCarSuccess />
      </>
    );
  }

export default Main_hoanthanhxe;
