import "../../../publics/styles/dieuKhoan.scss"
import Header from "../../layouts/header";
import Item_dieuKhoan from "./item_dieuKhoan";

function Main_dieuKhoan() {
    let datas = [
        {
            id: 1,
            title: "1. Chấp thuận điều khoản",
            contents: [
                "Khi truy cập và sử dụng trang web, quý khách mặc định đồng ý với các điều khoản này. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ của chúng tôi."
            ]
        },
        {
            id: 2,
            title: "2. Đặt tour du lịch",
            contents: [
                "Quý khách có thể chọn từ các tour du lịch có sẵn trên trang web. Thông tin về giá, lịch trình và các dịch vụ đi kèm được mô tả chi tiết cho từng tour.Khi đặt tour, quý khách cần cung cấp thông tin chính xác.Chúng tôi không chịu trách nhiệm cho các sai sót do quý khách cung cấp.Đặt cọc hoặc thanh toán toàn bộ chi phí tour là bắt buộc trước khi xác nhận đặt chỗ.Thông tin chi tiết về thanh toán sẽ được gửi qua email.",
            ]
        },
        {
            id: 3,
            title: "3. Đặt và thuê xe máy",
            contents: [
                "Quý khách cần có giấy phép lái xe hợp lệ để thuê xe máy.",
                "Quá trình đặt xe máy bao gồm việc cung cấp các thông tin cần thiết như ngày thuê, địa điểm giao xe, loại xe mong muốn và thời gian thuê.",
                "Chúng tôi có quyền từ chối cho thuê xe nếu quý khách không đáp ứng các điều kiện thuê hoặc có lịch sử vi phạm trước đó.,Trước khi nhận xe, quý khách cần kiểm tra tình trạng xe và báo ngay cho chúng tôi nếu có bất kỳ vấn đề gì.Quý khách chịu trách nhiệm với bất kỳ thiệt hại nào gây ra trong quá trình sử dụng.",
                "Sau khi đã đặt cọc hoặc thanh toán toàn bộ chi phí thuê xe, quý khách sẽ được hoàn lại tiền trong trong vòng 15p đầu tiên kể từ khi đặt xe. Việc thay đổi thời gian thuê xe sẽ được xem xét tùy thuộc vào tình trạng sẵn có."
            ]
        },
        {
            id: 4,
            title: "4. Chính sách bảo mật thông tin",
            contents: [
                "Chúng tôi cam kết bảo mật thông tin cá nhân của quý khách khi sử dụng dịch vụ. Các thông tin này chỉ được sử dụng cho mục đích cung cấp dịch vụ và liên lạc khi cần thiết.",
                "Chúng tôi không chia sẻ hoặc bán thông tin cá nhân của quý khách cho bên thứ ba, trừ khi có sự đồng ý của quý khách hoặc theo yêu cầu pháp lý.",
                
            ]
        },
        {
            id: 5,
            title: "5. Điều kiện sử dụng dịch vụ",
            contents: [
                "Đối với tour du lịch: Quý khách cần tuân thủ các quy định về an toàn và lịch trình do chúng tôi hoặc đối tác cung cấp. Trong trường hợp vi phạm, quý khách sẽ chịu trách nhiệm cho mọi thiệt hại hoặc chi phí phát sinh.Đối với thuê xe máy: Quý khách cần tuân thủ luật giao thông địa phương và bảo quản xe trong thời gian thuê.Quý khách chịu trách nhiệm cho mọi thiệt hại hoặc sự cố xảy ra trong quá trình sử dụng."            ]
        },
        {
            id: 6,
            title: "6. Trách nhiệm và giới hạn trách nhiệm",
            contents: [
"Trách nhiệm của khách hàng: Quý khách chịu trách nhiệm đảm bảo tính chính xác của thông tin cung cấp và tuân thủ các quy định khi sử dụng dịch vụ.",
"Giới hạn trách nhiệm của chúng tôi: Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào do sai sót từ phía khách hàng hoặc các sự kiện bất khả kháng như thời tiết xấu, thiên tai, hoặc sự kiện ngoài tầm kiểm soát."
            ]
        },
        {
            id: 7,
            title: "7. Chính sách hủy tour",
            contents: [
                "1.	Nếu Bên B hủy cọc tour trước 7 ngày so với ngày đặt cọc,. Bên B sẽ phải chịu mức phí phạt là [50 %] tổng giá trị phí cọc tour. .Còn sau 7 ngày so với ngày khởi hành thì mất  [100 %] tổng giá trị phí đặt cọc tour. Nếu hủy cọc trước 24h thì sẽ hoàn 100% cọc (Lưu ý; đặt10 ngày so với ngày khởi hành mới có lịch) " ,
            "2.	Nếu Bên B hủy tour trước 4 ngày so với ngày khởi hành. Bên B sẽ phải chịu mức phí phạt là [30 %] tổng giá trị phí đặt tour.Còn sau 4 ngày so với ngày khởi hành thì mất  [100 %] tổng giá trị phí đặt tour. Nếu hủy cọc trước 24h thì sẽ hoàn 100%.",
            "3.	Trong trường hợp Bên A hủy tour do sự kiện bất khả kháng (Thiên tai,...), Bên A sẽ hoàn lại số tiền Bên B đã thanh toán [80%] hoặc sắp xếp lịch trình khác phù hợp."
            ]
        },
        {
            id: 8,
            title: "8. Thay đổi và chấm dứt dịch vụ",
            contents: [
                "Chúng tôi có quyền thay đổi hoặc chấm dứt dịch vụ mà không cần báo trước nếu phát hiện khách hàng vi phạm điều khoản.Trong trường hợp vi phạm các quy định sử dụng, chúng tôi có quyền từ chối cung cấp dịch vụ trong tương lai hoặc chấm dứt hợp đồng."            ]
        },
        {
            id: 9,
            title: "9. Khiếu nại và Tranh chấp",
            contents: [
                "Mọi tranh chấp phát sinh từ việc sử dụng dịch vụ sẽ được giải quyết thông qua thỏa thuận và hòa giải giữa hai bên. Nếu không đạt được thỏa thuận, tranh chấp sẽ được giải quyết theo quy định của pháp luật."
            ]
        },
        {
            id: 10,
            title: "10.Liên hệ",
            contents: [
"Nếu quý khách có bất kỳ câu hỏi nào về điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua email: [beeangel@gmail.com] hoặc số điện thoại: [0394776323]."            ]
        },
    ]
    return <>
        <Header />
        <article className="dieuKhoan-container">
            <h1 className="title">ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI</h1>
            <p className="subtitle">Chào mừng quý khách đến với trang web của chúng tôi. Khi sử dụng các dịch vụ đặt tour du lịch và thuê xe máy, quý khách đồng ý tuân thủ các điều khoản dưới đây. Xin vui lòng đọc kỹ trước khi sử dụng dịch vụ.</p>

             {datas.map((data, index) => {
                 return <Item_dieuKhoan key={index} {...data} />
             })}
            
        </article>
    </>
}

export default Main_dieuKhoan
