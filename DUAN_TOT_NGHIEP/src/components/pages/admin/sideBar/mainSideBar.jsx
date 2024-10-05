import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import Main_navBar from '../navBar/main_navBar';
import "../../../../publics/styles/style-admin/admin.scss"


function MainSideBar() {
    
    return <>
        <Main_navBar />
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: ".8"}} /> */}
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                            <img src="/src/publics/image/avatar_null.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Manager</a>
                    </div>
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                        <li className="nav-item menu-open li-sidebar">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Home
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className='ul-admin-sideBar'>
                                        <Button className='btn-mui-sidebar' variant="contained"><a href='/manager'>Home</a></Button>
                                    </ul>
                                </AccordionDetails>

                            </Accordion>
                        </li>

                        <li className="nav-item menu-open li-sidebar">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Danh Mục
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className='ul-admin-sideBar'>
                                        <Button className='btn-mui-sidebar' variant="contained"><a href='/manager/danhMuc'>Danh sách</a></Button>
                                    </ul>
                                </AccordionDetails>

                            </Accordion>
                        </li>

                        <li className="nav-item menu-open li-sidebar">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Tour
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className='ul-admin-sideBar'>
                                        <Button className='btn-mui-sidebar' variant="contained"><a href='/manager/tour'>Danh sách</a></Button>
                                    </ul>
                                </AccordionDetails>

                            </Accordion>
                        </li>

                        <li className="nav-item menu-open li-sidebar">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Blog
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className='ul-admin-sideBar'>
                                        <Button className='btn-mui-sidebar' variant="contained"><a href='/manager/blog'>Danh sách</a></Button>
                                    </ul>
                                </AccordionDetails>

                            </Accordion>
                        </li>

                        <li className="nav-item menu-open li-sidebar">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Chat User
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className='ul-admin-sideBar'>
                                        <Button className='btn-mui-sidebar' variant="contained"><a href='/manager/chats'>Nhắn tin</a></Button>
                                    </ul>
                                </AccordionDetails>

                            </Accordion>
                        </li>

                        <li className="nav-item menu-open li-sidebar">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Khách hàng
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul className='ul-admin-sideBar'>
                                        <Button className='btn-mui-sidebar' variant="contained"><a href='/manager/users'>User</a></Button>
                                    </ul>
                                </AccordionDetails>

                            </Accordion>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>

        <div className='content-wrapper'>
            <Outlet />
        </div>
    </>
}

export default MainSideBar
