// Footer.js
import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footerSection">
       
        <div className="appStores">
          {/* <img src={playStore} alt="Google Play Store" /> */}
          {/* <img src={appStore} alt="Apple App Store" /> */}
        </div>
      </div>

      <div className="footerSection">
        
        
      </div>

      <div className="footerSection">
        {/* <h4>Follow Us</h4> */}
        <div className="socialLinks">
          {/* <a href="#">Instagram</a>
          <a href="#">Youtube</a>
          <a href="#">Facebook</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
