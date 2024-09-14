import Banner from "../home/banner"
import Header from "../../layouts/header"
import Item_tour from "../home/item_tour"

function Main_tours() {
  let list_dataTour = [
    {
      title: "Tour Huế",
      price: "1.500.000",
      title_child: "KINH THÀNH HUẾ - HUẾ",
      image: "https://cdn.media.dulich24.com.vn/diemden/kinh-thanh-hue-5562/kinh-thanh-hue.jpg",
      content: " Kinh Thành Huế, hoàn thành dưới triều Minh Mạng sau 27 năm xây dựng, là một phần quan trọng của Cố đô Huế.",
    },
    {
      title: "Tour Bà Nà 2N1Đ",
      price: "1.000.000",
      title_child: "BÀ NÀ - ĐÀ NẴNG",
      image: "https://tiki.vn/blog/wp-content/uploads/2023/03/ba-na-hills.jpg",
      content: "Bà Nà Hills Đà Nẵng, điểm lịch nổi tiếng cách Đà Nẵng 30km với độ cao 1.500m so với biển, được mệnh danh là 'Sapa của miền Trung'. ",
    },
  ]
  return <>
    <Header />
    <Banner />
    <div className="main-list-tour">
      <div className="box-list-tour">
        <div className="tieuDe-tour">
          <h2>Danh sách Tour</h2>
          <p><a href="#">Hiển thị tất cả</a></p>
        </div>
        <div className="line-tour"></div>

        <div className="list-tour">
          {list_dataTour.map((item, index) => {
            return <Item_tour key={index} {...item} />
          })}

        </div>
      </div>
    </div>
  </>
}

export default Main_tours
