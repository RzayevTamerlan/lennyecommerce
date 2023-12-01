import styles from "./ProductPagination.module.scss";
import Image from "next/image";
import classNames from "classnames";
import {useSwiper} from "swiper/react";

const ProductPagination = ({slides, activeSlide}) => {
  const swiper = useSwiper();
  return (
    <div className={styles.wrapper}>
      {slides.map((slide, index) => {
        const myLoader = ({src}) => {
          return `${process.env.NEXT_PUBLIC_API}${slide.attributes.url}`
        }
        return (
          <button onClick={() => swiper.slideTo(index)} key={slide.id} className={classNames(styles.slide_btn, {
            [styles.slide_btn_active]: index === activeSlide
          })}>
            <Image alt={'Slide'}
                   className={styles.slide_img}
                   width={86}
                   height={86}
                   loader={myLoader}
                   src={`${process.env.NEXT_PUBLIC_API}${slide.attributes.url}`}/>
          </button>
        )
      })}
    </div>
  );
};

export default ProductPagination;