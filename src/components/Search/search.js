import React from "react";
import styles from "./search.module.css";

const search = (props) => {
  return (
    <div className={styles.SearchField}>
      <input
        className={styles.SearchInput}
        placeholder="Search"
        onChange={(e) => props.inputChange(e.target.value)}
      ></input>
      <span className={styles.Icon}>
        <i className="search icon"></i>
      </span>
    </div>
  );
};

export default search;
