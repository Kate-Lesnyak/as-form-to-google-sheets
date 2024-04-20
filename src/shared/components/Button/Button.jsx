import styles from "./button.module.scss";

const Button = ({ type = "button", onClick, text, children, disabled }) => {
  
  return (
    <button className={styles.btn} type={type} onClick={onClick} disabled={disabled}>
      {text}
      {children}
    </button>
  );
};

export default Button;
