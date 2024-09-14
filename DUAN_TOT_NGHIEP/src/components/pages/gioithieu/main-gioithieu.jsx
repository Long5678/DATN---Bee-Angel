import Services from './Service';
import WhyChooseUs from './whychooseus';
import Team from './team';
import About from './about';
import Header from '../../layouts/header';

function Gioithieu() {
    return (
        <>
            <Header />
            <div className='main-gioithieu'>
                <h2 className='main-about-h4'>Giới thiệu Bee Angel</h2>
                <div className="main-about">
                    <About />
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
            </div>

        </>
    );
}

export default Gioithieu;