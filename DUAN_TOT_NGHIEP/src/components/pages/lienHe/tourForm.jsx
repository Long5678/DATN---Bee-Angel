
function TourForm() {
  return <>
      <div className="tour-form-container">
          <div className='tour-title'>
              <h1>Bạn muốn hỏi gì về chúng tôi</h1>
              <p>Giải đáp thắc mắc của khách hàng là trách nhiệm của chúng tôi , trả lời tận tâm <br /> nhiệt huyết</p>
          </div>
          <div className="tour-form">
              <h2>Thông tin khách hàng</h2>
              <form>
                  <div className="form-group">
                      <label>Họ tên</label>
                      <input type="text" placeholder="Trần Lê Anh" />
                  </div>
                  <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="tranleanh@gmail.com" />
                  </div>
                  <div className="form-group phone-group">
                      <label>Số điện thoại</label>
                      <div className="phone-input">
                          <select>
                              <option value="+84">+84</option>
                              {/* Add other country codes if needed */}
                          </select>
                          <input type="tel" placeholder="394776323" />
                      </div>
                  </div>
              </form>
          </div>

          <div className="additional-info">
              <div className="form-group">
                  <label>Điều bạn muốn giải đáp</label>
                  <textarea placeholder="vui lòng nhập"></textarea>
              </div>
          </div>
          <div className="tour-nhanvien">
              <p>Nhắn tin hổ trợ nhân viên ?</p>
          </div>
          <button type="submit">Gửi ngay</button>
      </div>
  </>
}

export default TourForm
