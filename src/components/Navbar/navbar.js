import React from "react";
import Search from "../Search/search";
import styles from "./navbar.module.css";

const navbar = (props) => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.Logo}>IoT83</div>
      <Search inputChange={props.search} />
    </div>
  );
};

export default navbar;
