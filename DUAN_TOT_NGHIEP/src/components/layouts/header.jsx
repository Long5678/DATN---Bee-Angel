import "../../publics/styles/header.scss"
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useState } from "react"
import Main_auth from "../pages/auth/main_auth"
import { useContext } from "react"
import { MainContext } from "../../context/mainContext"

function Header() {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(true)
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    
    const { open, check, setCheck, handleOpen, handleClose } = useContext(MainContext)

    return <>
        <header>
            <section className="main-header">
                <div className="list-menu-header">
                    <ul className="ul-logo">
                        <li><a href="/">BEE ANGEL</a></li>
                    </ul>
                    <ul className="list-item-header">
                        <li><a href="/tours">Danh Sách Tour</a></li>
                        <li><a href="/about">Giới Thiệu</a></li>
                        <li>Tin Tức</li>
                        <li><a href="/dieuKhoan">Điều Khoản</a></li>
                        <li onClick={handleOpen} style={{ color: "tomato" }}>Đăng nhập</li>
                    </ul>
                </div>
            </section>
        </header>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* phần này render ra tab login register */}
                <Main_auth check={check} setCheck={setCheck}  />
                <Main_auth check={check} setCheck={setCheck} />
            </Box>
        </Modal>
    </>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

export default Header