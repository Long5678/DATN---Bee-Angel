
function Item_profile({ title, value ,checkField, handleEdit }) {
  return <>
      <section className="section_body_profile">
          <div className="section_title">{title}</div>
          <button className={`li_value ${checkField !== null && "li_value_err"}`} onClick={() => handleEdit(value)} disabled={checkField !== null} ><i className="fa-regular fa-pen-to-square"></i>Chỉnh sửa</button>
      </section>
  </>
}

export default Item_profile
