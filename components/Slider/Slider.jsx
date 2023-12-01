"use client"
import styles from "./Slider.module.scss"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Slide from "./Slide/Slide";
import {Navigation} from "swiper/modules";
import SwiperNavigations from "./SwiperNavigations/SwiperNavigations";
import {useState} from "react";

const Slider = ({data}) => {
  const [slide, setSlide] = useState(0);
  return (
    <section className={styles.slider_box}>
      <Swiper
        className={styles.slider}
        spaceBetween={0}
        modules={[Navigation]}
        slidesPerView={1}
        onSlideChange={(e) => setSlide(() => e.activeIndex)}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide><Slide data={data}></Slide></SwiperSlide>
        <SwiperSlide><Slide data={data}></Slide></SwiperSlide>
        <SwiperSlide><Slide data={data}></Slide></SwiperSlide>
        <SwiperNavigations slide={slide}></SwiperNavigations>
      </Swiper>
    </section>
  );
};

export default Slider;
