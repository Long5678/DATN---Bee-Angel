import "../../../publics/styles/gioithieu.scss"
import img1 from '../../../publics/image/about-us-img-2 1.png';
function Team() {
    return (
        <div className="card-container">
            <div className="card-header">
                Bee Angel
            </div>
            <div className="card-content">
                <div className="profile-picture">
                    {/* Replace this with an actual image tag if needed */}
                    <img src={img1} alt="Trần Lê Anh" />
                </div>
                <div className="card-details">
                    <h2>Trần Lê Anh</h2>
                    <p>Trưởng nhóm</p>
                    <p className="email">tranleanhtuha@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default Team;