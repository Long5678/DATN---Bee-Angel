import React, { useState, useEffect } from "react";
import Header from "../../layouts/header";
import BookingSuccess from "./view_thanhtoan";
import '../../../publics/styles/BookingSuccess.scss'

function View_hoanthanh() {
    return (
      <>
        <Header />
          <BookingSuccess />
      </>
    );
  }

export default View_hoanthanh;
