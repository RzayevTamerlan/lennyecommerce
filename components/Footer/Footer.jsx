import styles from "./Footer.module.scss"
import Logo from "../Logo/Logo";
import SecondaryText from "../ui/SecondaryText/SecondaryText";
import TitleText from "../ui/TitleText/TitleText";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <div className={"container"}>
          <div className={styles.inner}>
            <div className={styles.footer_left}>
              <Logo/>
              <SecondaryText
                size={'sm'}
                className={styles.description}
                isCenter={false}
                text={'The biggest marketplace managed by Ideologist corp, which provides various kinds of daily needs and hobbies.'}/>
            </div>
            <div className={styles.footer_right}>
              <ul className={styles.grid}>
                <li className={styles.grid_item}>
                  <TitleText size={'sm'} isCenter={false} text={'About Lenny'}/>
                  <ul className={styles.column}>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Information</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Store Lactor</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Bulk Purchase</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Alteration Services</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Gift Delivery Service</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Live Station</Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.grid_item}>
                  <TitleText size={'sm'} isCenter={false} text={'About Lenny'}/>
                  <ul className={styles.column}>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>FAQ</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Return Policy</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Privacy Policy</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Accessibillity</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Contact Us</Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.grid_item}>
                  <TitleText size={'sm'} isCenter={false} text={'Account'}/>
                  <ul className={styles.column}>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Membership</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Address</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Cupons</Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.grid_item}>
                  <TitleText size={'sm'} isCenter={false} text={'Contact Us'}/>
                  <ul className={styles.column}>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>For Lenny Consumer
                        Complaint Services</Link>
                    </li>
                    <li className={styles.column_item}>
                      <a className={styles.link} href="tel:6845550102">(684) 555-0102</a>
                    </li>
                    <li className={styles.column_item}>
                      <a className={styles.link} href="mailto:curtis.weaver@example.com">curtis.weaver@example.com</a>
                    </li>
                    <span className={styles.border}></span>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Customers Complaint Service</Link>
                    </li>
                    <li className={styles.column_item}>
                      <Link href={'#'} className={styles.link}>Directorate Generate of the
                        Republic of Indonesia</Link>
                    </li>
                    <li className={styles.column_item}>
                      <a href="tel:4805550103">(480) 555-0103</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <div className={"container"}>
          <div className={styles.inner_bottom}>
            <p className={styles.copyright}>
              COPYRIGHT © LENNY CO., LTD. ALL RIGHTS RESERVED.
            </p>
            <div className={styles.policy_box}>
              <Link href={'#'} className={styles.policy_item}>Terms of use</Link>
              <Link href={'#'} className={styles.policy_item}>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;