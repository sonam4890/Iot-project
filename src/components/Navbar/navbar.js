import React from "react";
import Search from "../Search/search";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

const navbar = (props) => {
  return (
    <div className={styles.Navbar}>
      <div>
        <Link to="/" className={styles.Logo}>
          IoT83
        </Link>
      </div>

      <Search inputChange={props.search} />
      <div>
        <Link to="/signIn" className={styles.Anchor}>
          signIn
        </Link>
      </div>
    </div>
  );
};

export default navbar;
