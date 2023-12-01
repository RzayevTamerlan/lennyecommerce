'use client';
import {useSwiper} from "swiper/react";
import classNames from "classnames";
import styles from "./ProductSlideNav.module.scss";
import Image from "next/image";
import arrowRight from "../../../public/icons/arrow-right/arrow-right.svg";

const ProductSlideNav = ({slide}) => {
  const swiper = useSwiper();
  return (
    <>
      <button className={classNames(styles.button_prev, {
        [styles.button_prev_active]: slide !== 0
      })} onClick={() => swiper.slidePrev()}>
        <Image alt={'next'} src={arrowRight}></Image>
      </button>
      <button className={classNames(styles.button_next, {
        [styles.button_next_active]: slide !== 3
      })} onClick={() => swiper.slideNext()}>
        <Image alt={'prev'} src={arrowRight}></Image>
      </button>
    </>
  );
};

export default ProductSlideNav;