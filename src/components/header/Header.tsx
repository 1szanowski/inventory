
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.linkBox}>First Link</div>
      <div className={styles.linkBox}>Second Link</div>
    </header>
  );
};

export default Header;
