import "../../../publics/styles/list-tour.scss"
import Item_tour from "./item_tour"

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
  {
    title: "Tour Hội An 3N2Đ",
    price: "2.500.000",
    title_child: "PHỐ CỔ - HỘI AN",
    image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/10/6/1101769/Hoi-An-22.jpeg",
    content: "Hội An, một phần quan trọng của tỉnh Quảng Nam, Việt Nam, là một thành phố cổ nằm 30km về phía Nam của thành phố Đà Nẵng ",
  },
  {
    title: "Tour Hội An 3N2Đ",
    price: "2.500.000",
    title_child: "PHỐ CỔ - HỘI AN",
    image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/10/6/1101769/Hoi-An-22.jpeg",
    content: "Hội An, một phần quan trọng của tỉnh Quảng Nam, Việt Nam, là một thành phố cổ nằm 30km về phía Nam của thành phố Đà Nẵng ",
  },
  {
    title: "Tour Bà Nà 2N1Đ",
    price: "1.000.000",
    title_child: "BÀ NÀ - ĐÀ NẴNG",
    image: "https://tiki.vn/blog/wp-content/uploads/2023/03/ba-na-hills.jpg",
    content: "Bà Nà Hills Đà Nẵng, điểm lịch nổi tiếng cách Đà Nẵng 30km với độ cao 1.500m so với biển, được mệnh danh là 'Sapa của miền Trung'. ",
  },
]

function List_tour() {
  return <>
    <article className="main-list-tour">
      <section className="box-list-tour">
        <section className="tieuDe-tour">
          <h2>Danh sách Tour</h2>
          <p><a href="#">Hiển thị tất cả</a></p>
        </section>
        <div className="line-tour"></div>

        <section className="list-tour">
          {list_dataTour.map((item, index) => {
            return <Item_tour key={index} {...item} />
          })}
        </section>
      </section>
    </article>
  </>
}

export default List_tour