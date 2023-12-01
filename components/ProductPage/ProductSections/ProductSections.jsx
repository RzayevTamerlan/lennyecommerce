'use client';
import styles from "./ProductSections.module.scss"
import Link from "next/link";
import {useEffect, useState} from "react";
import classNames from "classnames";

const ProductSections = () => {
  const [active, setActive] = useState('detail');
  const handleSetActive = (anchor) => {
    setActive(anchor);
  }
  useEffect(() => {
    setActive(window.location.hash.substring(1) || 'detail');
  }, []);
  return (
    <section className={styles.wrapper}>
      <ul className={styles.sections_list}>
        <li className={styles.section_item}>
          <Link className={classNames(styles.section_link, {
            [styles.section_link_active]: active === 'detail'
          })} onClick={() => handleSetActive('detail')} href={'#detail'}>Detail Product
            <div className={styles.line}></div>
          </Link>
        </li>
        <li className={styles.section_item}>
          <Link className={classNames(styles.section_link, {
            [styles.section_link_active]: active === 'merchant'
          })} onClick={() => handleSetActive('merchant')} href={'#merchant'}>Merchant
            <div className={styles.line}></div>
          </Link>
        </li>
        <li className={styles.section_item}>
          <Link className={classNames(styles.section_link, {
            [styles.section_link_active]: active === 'reviews'
          })} onClick={() => handleSetActive('reviews')} href={'#reviews'}>Reviews
            <div className={styles.line}></div>
          </Link>
        </li>
        <li className={styles.section_item}>
          <Link className={classNames(styles.section_link, {
            [styles.section_link_active]: active === 'product'
          })} onClick={() => handleSetActive('product')} href={'#product'}>Related Product
            <div className={styles.line}></div>
          </Link>
        </li>
        <div className={styles.line}></div>
      </ul>

    </section>
  );
};

export default ProductSections;