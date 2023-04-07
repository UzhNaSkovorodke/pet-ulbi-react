import React from "react";
import styles from "./MyButton.module.css";

function MyButton({ children, ...props }) {
  return (
    //это свой компонент кнопки, который пропсом children принимает все что мы пишем внутри кнопки (это встроенная база)
    //{...props} как свойство тэга означает что всё что мы передадим в этот компонент пропсами будет свойством этого тэга
    //ну и внимание на 4 строку где мы делаем деструктуризацию, но также оставляет ...props
    <button {...props} className={styles.myBtn}>
      {children}
    </button>
  );
}

export default MyButton;
