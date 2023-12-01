"use client";
import styles from "./ProductSlide.module.scss";
import Image from "next/image";
const ProductSlide = ({slide}) => {
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${slide.attributes.url}`
  }
  return (
    <div className={styles.wrapper}>
      <Image className={styles.image} width={300} height={300} loader={myLoader}
             src={`${process.env.NEXT_PUBLIC_API}${slide.attributes.url}`}
             alt={`${slide.attributes.name}`}/>
    </div>
  );
};

export default ProductSlide;