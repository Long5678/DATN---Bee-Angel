import TextField from '@mui/material/TextField';
function Item_profileEdit({ handleCancle, handleSave, label }) {
  return <>
      <section className="section_body_profile">
          <div className="section_title"><TextField className="textField-auth" label={label} size="small" variant="outlined" /></div>
          <div className="cancle_save">
              <button className="li_value" onClick={handleCancle}>Hủy</button>
              <button className="save_profile" onClick={handleSave}>Lưu</button>
          </div>
      </section>
  </>
}

export default Item_profileEdit