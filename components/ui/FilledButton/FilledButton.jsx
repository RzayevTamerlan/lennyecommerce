import styles from "./FilledButton.module.scss"
import Link from "next/link";

const FilledButton = ({text, href,}) => {
  return (
    <Link href={href} className={styles.button}>
      {text}
    </Link>
  );
};

export default FilledButton;