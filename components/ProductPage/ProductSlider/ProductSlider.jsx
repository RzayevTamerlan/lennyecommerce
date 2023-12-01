'use client'
import styles from "./ProductSlider.module.scss";
import {Navigation, Pagination, EffectCoverflow} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useState} from "react";
import ProductSlide from "../ProductSlide/ProductSlide";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-coverflow';
import ProductSlideNav from "../ProductSlideNav/ProductSlideNav";
import ProductPagination from "../ProductPagination/ProductPagination";

const ProductSlider = ({sliders}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  console.log(activeSlide)
  return (
    <div className={styles.wrapper}>
      <Swiper
        effect={'coverflow'}
        className={styles.slider}
        spaceBetween={0}
        modules={[Navigation, Pagination, EffectCoverflow]}
        slidesPerView={1}
        onSlideChange={(e) => setActiveSlide(() => e.activeIndex)}
      >
        {sliders.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <ProductSlide slide={slide}/>
          </SwiperSlide>
        ))}
        <ProductSlideNav slide={activeSlide}/>
        <ProductPagination slides={sliders} activeSlide={activeSlide}/>
      </Swiper>
    </div>
  );
};

export default ProductSlider;