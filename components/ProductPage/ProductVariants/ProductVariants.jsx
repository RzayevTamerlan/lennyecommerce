'use client';
import {useEffect, useState} from "react";
import styles from "./ProductVariants.module.scss"
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import arrowDown from "../../../public/icons/arrow-down/arrow-down.svg"

const ProductVariants = ({activeVariant, slug, variants, allParams, whichParam}) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(activeVariant, 'active variant')
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.variants_btn}`)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOpenClick = (e) => {
    e.preventDefault();
    if (e.target.closest(`.${styles.variants_btn}`)) {
      if(!variants) return;
      setIsOpen((state) => !state);
    }
  }
  let renderVariants;
  if (variants) {
    renderVariants = variants.map((variant, index) => {
      return (
        <Link className={styles.variants}
              href={`${slug.slug}?${new URLSearchParams({...allParams, [whichParam]: variant})}`}
              key={index}>{`${variant[0].toUpperCase()}${variant.slice(1)}`}</Link>
      )
    })
  }
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.type}>
        {whichParam}
      </h4>
      <button onClick={(e) => handleOpenClick(e)} className={classNames(styles.variants_btn, {
        [styles.variants_btn_open]: isOpen
      })}>
        {activeVariant[0].toUpperCase() + activeVariant.slice(1)}
        <Image alt={'Set variant'} src={arrowDown} className={classNames(styles.arrow, {
          [styles.arrow_open]: isOpen
        })}/>
        <div className={classNames(styles.variants_wrapper, {
          [styles.variants_wrapper_open]: isOpen
        })}>
          {renderVariants}
        </div>
      </button>
    </div>
  );
};

export default ProductVariants;