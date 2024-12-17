import "../../../publics/styles/sale.scss"
function Video_traiNghiem() {
  return <>
    <div className="box_videoTraiNghiem">

      <div className="video_TraiNghiem">
        <video controls>
          <source src="/src/publics/video_home.mov"
            type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="content_TraiNghiem">
        <div className="div1">Một trải nghiệm thực sự tuyệt vời</div>
        <div className="div2">Thật tuyệt vời cho những ai muốn thoát khỏi sự tấp nập và nhộn nhịp của cuộc sống thành phố hoặc thoát khỏi công nghệ trong vài ngày. Tôi có thể ở lại thêm một tuần nữa!</div>
        <div className="div3">Họ thực sự đã nghĩ về mọi thứ ở đây đến từng chi tiết nhỏ nhất.</div>
      </div>

    </div>
  </>
}

export default Video_traiNghiem
