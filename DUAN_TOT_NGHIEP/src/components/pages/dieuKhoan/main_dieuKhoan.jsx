import "../../../publics/styles/dieuKhoan.scss"
import Header from "../../layouts/header";
import Item_dieuKhoan from "./item_dieuKhoan";

function Main_dieuKhoan() {
    let datas = [
        {
            id: 1,
            title: "1. Giới thiệu",
            contents: [
                "Các Điều khoản và Điều kiện này Điều khoản chi phối việc bạn sử dụng các dịch vụ do [Tên công ty] cung cấp, một công ty lữ hành chuyên về các tour du lịch và các gói du lịch. Bằng cách đặt hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý bị ràng buộc bởi các Điều khoản này."
            ]
        },
        {
            id: 2,
            title: "2. Đặt chỗ và thanh toán",
            contents: [
                "Quy trình đặt phòng: Để đảm bảo đặt phòng, bạn cần đặt cọc [phần trăm] tại thời điểm đặt phòng. Số tiền còn lại phải thanh toán trước [số] ngày so với ngày khởi hành.",
                "Phương thức thanh toán: Thanh toán có thể được thực hiện bằng thẻ tín dụng, chuyển khoản ngân hàng hoặc các phương thức khác được chỉ định trên trang web của chúng tôi.",
                "Chính sách hủy: Việc hủy phải được thực hiện bằng văn bản. Việc hủy được thực hiện trước [số] ngày so với ngày khởi hành sẽ phải chịu phí hủy [phần trăm]. Không hoàn lại tiền cho việc hủy được thực hiện trước ngày khởi hành ít hơn [số] ngày.",
            ]
        },
        {
            id: 3,
            title: "3. Tài liệu du lịch",
            contents: [
                "Hộ chiếu và thị thực: Mỗi du khách có trách nhiệm đảm bảo rằng họ có hộ chiếu, thị thực hợp lệ và các giấy tờ cần thiết khác cho điểm đến mà họ đến.",
                "Bảo hiểm du lịch: Chúng tôi đặc biệt khuyến nghị tất cả du khách nên mua bảo hiểm du lịch toàn diện để chi trả cho việc hủy chuyến đi, chi phí y tế và các rủi ro tiềm ẩn khác.",
            ]
        },
        {
            id: 4,
            title: "4. Giá cả và Bao gồm",
            contents: [
                "Giá cả: Tất cả giá được báo bằng [tiền tệ] và có thể thay đổi mà không cần báo trước. Giá bao gồm các dịch vụ được nêu trong xác nhận đặt phòng nhưng không bao gồm các mục mang tính cá nhân như bữa ăn không được nêu, tiền boa hoặc bảo hiểm du lịch.",
                "Bao gồm: Giá tour bao gồm chỗ ở, phương tiện di chuyển và các tour có hướng dẫn viên như đã nêu trong hành trình.Các dịch vụ bổ sung như các chuyến tham quan tùy chọn có thể được cung cấp với một khoản phí bổ sung.",
            ]
        },
        {
            id: 5,
            title: "5. Thay đổi hành trình",
            contents: [
                "Thay đổi của Công ty: [Tên công ty] có quyền thay đổi hành trình do những tình huống bất khả kháng, bao gồm nhưng không giới hạn ở điều kiện thời tiết, đình công hoặc các sự kiện khác nằm ngoài tầm kiểm soát của chúng tôi. Bất kỳ thay đổi nào sẽ được thông báo sớm nhất có thể.",
                "Thay đổi của Khách du lịch: Nếu bạn muốn thay đổi đặt phòng sau khi xác nhận, có thể áp dụng thêm phí. Chúng tôi sẽ cố gắng hết sức để đáp ứng các thay đổi, nhưng không thể đảm bảo tình trạng còn phòng.",
            ]
        },
        {
            id: 6,
            title: "6. Trách nhiệm và nghĩa vụ",
            contents: [
                "Trách nhiệm của công ty: [Tên công ty] hoạt động như một đại lý cho các nhà cung cấp dịch vụ du lịch và không thể chịu trách nhiệm cho bất kỳ hành động hoặc thiếu sót nào của các nhà cung cấp này. Trách nhiệm của chúng tôi chỉ giới hạn ở giá của các dịch vụ đã đặt.",
                "Trách nhiệm của du khách: Du khách chịu trách nhiệm về đồ đạc cá nhân, sức khỏe và sự an toàn của mình trong suốt chuyến đi. [Tên công ty] không chịu trách nhiệm về bất kỳ thương tích, mất mát hoặc thiệt hại nào xảy ra trong suốt chuyến đi.",
            ]
        },
        {
            id: 7,
            title: "7. Bất khả kháng",
            contents: [
                "[Tên công ty] sẽ không chịu trách nhiệm đối với bất kỳ trường hợp không thực hiện nghĩa vụ của mình theo các Điều khoản này nếu trường hợp không thực hiện đó là do các sự kiện nằm ngoài tầm kiểm soát hợp lý của công ty, bao gồm nhưng không giới hạn ở thiên tai, chiến tranh, đình công hoặc hạn chế của chính phủ.",
            ]
        },
        {
            id: 8,
            title: "8. Luật quản lý",
            contents: [
                "Các Điều khoản này được điều chỉnh và diễn giải theo luật pháp của [Quốc gia/Tiểu bang] và mọi tranh chấp phát sinh từ các Điều khoản này sẽ tuân theo quyền tài phán độc quyền của tòa án [Quốc gia/Tiểu bang].",
            ]
        },
        {
            id: 9,
            title: "9. Khiếu nại và Tranh chấp",
            contents: [
                "Khiếu nại: Mọi khiếu nại phải được gửi bằng văn bản đến [Tên công ty] trong vòng [số] ngày kể từ ngày kết thúc chuyến tham quan. Chúng tôi sẽ cố gắng giải quyết mọi vấn đề nhanh nhất có thể.",
                "Giải quyết tranh chấp: Trong trường hợp xảy ra tranh chấp, cả hai bên đồng ý trước tiên tìm cách giải quyết thông qua hòa giải trước khi theo đuổi hành động pháp lý.",
            ]
        },
        {
            id: 10,
            title: "10. Chấp nhận các điều khoản",
            contents: [
                "Bằng cách đặt phòng với [Tên công ty], bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý với các Điều khoản và Điều kiện này.",
            ]
        },
    ]
    return <>
        <Header />
        <article className="dieuKhoan-container">
            <h1 className="title">Điều khoản của chúng tôi</h1>
            <p className="subtitle">Hãy để chúng tôi giải đáp thắc mắc của bạn!</p>

             {datas.map((data, index) => {
                 return <Item_dieuKhoan key={index} {...data} />
             })}
            
        </article>
    </>
}

export default Main_dieuKhoan
