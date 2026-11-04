import logo from "../assets/capitec-logo.png";


function Footer() {
  return (
    <footer className="site-footer">
        <div className="logo">
            <img src={logo} alt="Logo" />  
        </div>

        <div className="footer-text">
            <p><strong> This is a demo.The interest rates are mock rates and this is not a real loan offer.</strong></p>
<br />
            <p>&copy; {new Date().getFullYear()} Mmasello Manabile</p>
        </div>
    </footer>
  );
}

export default Footer;