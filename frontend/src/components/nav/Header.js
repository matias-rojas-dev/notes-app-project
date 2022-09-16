import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <div className="header">
        <div className="header-menu">
            <Link to="/">Home</Link>
            <Link to="/archived">Archive</Link>
        </div>
    </div>
  ) 
};

export default Header;
