import "../../../publics/styles/header.scss"
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Banner() {
    return <>
        <article className="main-banner">
            <img src="/src/publics/image/banner0.jpg" alt="" />

            <section className="content-banner">
                <div className="content-banner-title">Cuộc sống là những hành trình Hãy cứ đi khi cuộc đời cho phép</div>
                <p>Chào mừng đến với Bee Angel ấm cúng của chúng tôi nằm giữa lòng núi! Cabin của chúng tôi là nơi nghỉ ngơi hoàn hảo cho những ai tìm kiếm sự bình yên và thư giãn trong bối cảnh thiên nhiên.</p>

                <section className="box-list-inp">
                    <div className="box-inp">
                        <div className="icon-inp"><MapIcon /></div>
                        <input type="text" placeholder="Bạn muốn đi đâu?" />
                    </div>
                    <div className="box-tour">
                        <div className="icon-inp"><CalendarMonthIcon /></div>
                        <div>Các tour</div>
                    </div>
                    <button className="btn-search">Tìm kiếm</button>
                </section>
            </section>
        </article>
    </>
}

export default Banner