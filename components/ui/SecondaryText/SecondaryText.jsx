import styles from "./SecondaryText.module.scss";
import classNames from "classnames";


const SecondaryText = ({text, size, className = 'null', isCenter = false}) => {
  return (
    <p className={classNames(styles.text, className, {
      [styles.sm]: size === 'sm',
      [styles.md]: size === 'md',
      [styles.center]: isCenter,
    })}>
      {text}
    </p>
  );
};

export default SecondaryText;