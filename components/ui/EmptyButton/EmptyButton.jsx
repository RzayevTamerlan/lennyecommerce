import Link from "next/link";
import styles from './EmptyButton.module.scss'
import classNames from "classnames";
import Image from "next/image";

const EmptyButton = ({isLink, link, size, text, icon = null, callback}) => {
  return (
    isLink ? <Link href={link} className={classNames(styles.button, {
        [styles.sm]: size === 'sm',
        [styles.md]: size === 'md'
      })}>
        {icon ? <Image src={icon} alt={'basket'}></Image> : null}{text}
      </Link>
      :
      <button onClick={callback} className={classNames(styles.button, {
        [styles.sm]: size === 'sm',
        [styles.md]: size === 'md'
      })}>
        {text}
      </button>
  );
};

export default EmptyButton;