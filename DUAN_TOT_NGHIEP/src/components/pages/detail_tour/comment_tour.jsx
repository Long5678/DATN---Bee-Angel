

function Comment_tour() {
    return <>
        <div className="main-list-tour">
            <div className="box-list-tour">
                <div className="tieuDe-tour">
                    <h2>Bình Luận</h2>
                </div>
                <div className="line-tour"></div>
                {/* comment */}
                <div>
                    <div className="comment-input">
                        <div className="avatar"></div>
                        <input type="text" placeholder="Điều bạn muốn nói" />
                        <button>Gửi</button>
                    </div>

                    <div className="comment-section">
                        <div className="comment">
                            <div className="avatar">👤</div>
                            <div className="comment-content">
                                <h4>Tranleanh</h4>
                                <p>wow video đẹp quá và tôi cũng thích tour này</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}

            </div>
        </div>
    </>
}

export default Comment_tour
