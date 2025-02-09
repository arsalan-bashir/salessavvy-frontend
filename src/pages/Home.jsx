import '.././assets/home.css';
import homeImg from '../assets/homepage-img.svg';
import logo from '../assets/salessavvy-logo.png';
import regIcon from '../assets/reg-icon.svg';
import loginIcon from '../assets/login-icon.svg';

export default function Home()  {
    return (
        <>
            <div className="container">
                <div className="left-section">
                    <img className="logo-image" src={logo} alt="logo" />
                    <h1 className="title">Sales Savvy</h1>
                    <p className="description">Smart Selling, Seamless Shopping</p>
                    <div className="home-links">
                        <a className="home-link" href="/register">
                            <img className="icon" src={regIcon} alt="logo" />
                            New Customer</a>
                        <a className="home-link" href="/login">
                            <img className="icon" src={loginIcon} alt="logo" />
                            Existing Customer</a>
                    </div>
                </div>
                <div className="right-section">
                    <img className="home-image" src={homeImg} alt="IMAGE" />
                </div>

            </div>
        </>
    );
}