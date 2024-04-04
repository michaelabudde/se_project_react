import "./Footer.css";
import React from "react";
function Footer() {
  return (
    <footer className="footer">
      <div>Developed by Michaela Budde</div>
      <div> {new Date().getFullYear()}</div>
    </footer>
  );
};
export default Footer;
