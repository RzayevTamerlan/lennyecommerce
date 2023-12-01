'use client'
import {useEffect, useState} from 'react';
import styles from './ProductsDropdown.module.scss'
import Image from "next/image";
import arrowDown from "../../../public/icons/arrow-down/arrow-down.svg";
import classNames from "classnames";
import Link from "next/link";

const ProductsDropdown = ({sortBy, allParams}) => {
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.closest(`.${styles.sort}`)) {
      } else {
        setIsSortingOpen(false);
      }
    })
  }, []);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const handleSortingOpen = (e) => {
    e.preventDefault();
    setIsSortingOpen((state) => !state);
  };
  return (
    <button onClick={(e) => handleSortingOpen(e)} className={classNames(styles.sort, {
      [styles.sort_open]: isSortingOpen,
    })}>
      {sortBy === '1' ? 'From Low to High' : 'From High to Low'}
      <Image src={arrowDown} alt={'open sorting list'} className={classNames(styles.arrow_down, {
        [styles.arrow_down_open]: isSortingOpen,
      })}/>
      <div className={classNames(styles.sort_options, {
        [styles.sort_options_open]: !isSortingOpen,
      })}>
        <Link href={`/products?${new URLSearchParams({...allParams, page: 1, sortBy: -1})}`}>
          From High to Low
        </Link>
        <Link href={`/products?${new URLSearchParams({...allParams, page: 1, sortBy: 1})}`}>
          From Low to High
        </Link>
      </div>
    </button>
  );
};

export default ProductsDropdown;