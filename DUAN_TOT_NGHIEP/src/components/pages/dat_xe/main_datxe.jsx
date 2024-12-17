import FormDatXe from "./FormDatXe";
import "../../../publics/styles/bookCar.scss";
import RightDatXe from "./RightDatXe";
import Header from "../../layouts/header";
function Main_datXe() {
  return (
    <>
      <Header />
      <section className="main-bookCar">
        <section className="title-bookCar">
          <h1>Đặt Xe Ngay</h1>
          <p>Khách hàng rất quan trọng, vui lòng nhập đúng thông tin</p>
        </section>

        <section className="d-flex-bookCar">
          <FormDatXe />
          <RightDatXe />
        </section>
      </section>
    </>
  );
}

export default Main_datXe;
