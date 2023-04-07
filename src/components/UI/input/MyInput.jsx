import React from "react";
import styles from "./MyInput.module.css";

function MyInput(props) {
  //тут ничего сообенного кроме {...props} в свойствах тэга, что означает все что мы передадим пропсами будет свойствами этого тэга
  return <input className={styles.MyInput} {...props} />;
}

export default MyInput;
