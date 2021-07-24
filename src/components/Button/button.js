import React from "react";
import styles from "./button.module.css";

const button = (props) => {
  let style = props.disable ? [styles.NoButton] : [styles.Button];
  return (
    <div>
      <button onClick={props.click} className={style} disabled={props.disable}>
        <i className={props.icon}></i>
      </button>
    </div>
  );
};

export default button;

// chevron right icon
