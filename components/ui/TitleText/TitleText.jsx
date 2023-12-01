import classNames from "classnames";
import styles from "./TitleText.module.scss"

const TitleText = ({isCenter, size, text}) => {
  return (
    <h2 className={classNames(styles.title_text, {
      [styles.text_center]: isCenter,
      [styles.text_big]: size === 'lg',
      [styles.text_medium]: size === 'md',
      [styles.text_small]: size === 'sm',
      [styles.text_xs]: size === 'xs',
    })}>
      {text}
    </h2>
  );
};

export default TitleText;