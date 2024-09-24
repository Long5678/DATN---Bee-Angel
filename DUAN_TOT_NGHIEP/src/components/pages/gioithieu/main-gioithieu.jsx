import Services from './Service';
import WhyChooseUs from './whychooseus';
import Team from './team';
import About_huy from './about_huy';
import Header from '../../layouts/header';
import About from './about';

function Gioithieu() {
    return (
        <>
            <Header />
            <About />
            {/* <div className='main-gioithieu'>
                <h2 className='main-about-h4'>Giới thiệu Bee Angel</h2>
                <div className="main-about">
                    <About_huy />
                    <Services />

                </div>
                <div>
                    <WhyChooseUs />
                    <h4 className='main-team-h4'>CV của các thành viên</h4>
                    <div className='main-team'>
                        <Team />
                        <Team />
                        <Team />
                        <Team />
                        <Team />
                        <Team />
                    </div>

                </div>
            </div> */}

        </>
    );
}

export default Gioithieu;