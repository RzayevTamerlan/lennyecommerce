import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/logo/logo.svg"
import styles from "./Logo.module.scss"
import React from "react";

const Logo = () => {
  return (
    <Link href={'/'} className={styles.btn}>
      <Image className={styles.logo} src={logo} alt={'Lenny'}/>
      <h1 className={styles.logo_name}>lenny.</h1>
    </Link>
  );
};

export default Logo;