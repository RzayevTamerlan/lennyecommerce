import styles from './NavigationBar.module.scss'
import Link from "next/link";
import Image from "next/image"
import arrowRight from "../../../../public/icons/arrow-right-gray/arrow-right.svg"

const NavigationBar = () => {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.inner}>
          <Link className={styles.link_green} href={'/'}>Home</Link>
          <div className={styles.arrow_box}>
            <Image src={arrowRight} alt={'Next'} className={styles.arrow}/>
          </div>
          <Link className={styles.link_green} href={'/posts'}>Article</Link>
          <div className={styles.arrow_box}>
            <Image src={arrowRight} alt={'Next'} className={styles.arrow}/>
          </div>
          <div className={styles.link}>Detail Article</div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;