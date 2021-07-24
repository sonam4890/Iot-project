import React from "react";
import styles from "./image.module.css";

const image = (props) => {
  return (
    <div className={styles.Image}>
      <a href={props.pic} target="_blank">
        <img src={props.pic} alt="image" className={styles.Picture}></img>
      </a>
    </div>
  );
};

export default image;
