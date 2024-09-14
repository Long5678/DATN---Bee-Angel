import { useState } from "react"

function Item_dieuKhoan({title, contents }) {
    const [checkDieuKhoan, setCheckDieuKhoan] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [noneContent, setNoneContent] = useState(false);

    let itemContent = contents.map((content, index) => {
        return <li key={index}>{content}</li>
    })

    const handleClick = () => {
        if (checkDieuKhoan) {
            setCheckDieuKhoan(false);
            setShowContent(false);
            setNoneContent(false);
        } else {
            setCheckDieuKhoan(true);
            setNoneContent(true)
            setTimeout(() => {
                setShowContent(true);
            }, 10);
        }
    }

    return <>
        <section className="dieuKhoan-group">
            <div className="group-head">
                <div className="head_1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-right-text-fill" viewBox="0 0 16 16">
                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
                    </svg>
                    <span className="title_dieuKhoan">{title}</span>
                </div>
                <button className="head_2" onClick={handleClick}>{noneContent ? "Ẩn bớt" : "Xem thêm"}</button>
            </div>
            {checkDieuKhoan &&
                (<div className={`group-body ${showContent && "group-body-show"}`}>
                    <ul className="ul_dieuKhoan">
                        {itemContent}
                    </ul>
                </div>)
            }
        </section>
    </>
}

export default Item_dieuKhoan
