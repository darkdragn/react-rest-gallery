import { Link, NavLink, withRouter } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="nav-wrapper blue darken-6">
      <div className="container">
        <Link className="brand-logo left" to="/">
          TestTitle
        </Link>
        <ul className="right">
          <li>
            <NavLink to="/test">Test</NavLink>
          </li>
          <li>
            <NavLink to="/grid">Grid</NavLink>
          </li>
          <li>
            <NavLink to="/gridlist">GridList</NavLink>
          </li>
          <li>
            <NavLink to="/gallery/riversong/seethrough">See Through</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
