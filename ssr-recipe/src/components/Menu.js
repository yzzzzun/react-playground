import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <uil>
      <li>
        <Link to="/red">Red</Link>
      </li>
      <li>
        <Link to="/blue">Blue</Link>
      </li>
    </uil>
  );
};

export default Menu;
