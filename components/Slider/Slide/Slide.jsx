import styles from "./Slide.module.scss";
import slideImg from "../../../public/slide/slide.jpg"
import smallSlideImg from "../../../public/slide/small-slide.jpg"
import Image from "next/image";
import ProductCard from "../../ProductCard/ProductCard";
import Link from "next/link";
import classNames from "classnames";

const Slide = ({data}) => {
  // console.log(data.data.attributes.price)
  return (
    <div className={styles.slide}>
      <Image src={slideImg} className={styles.slide_img} alt={'Slider'}/>

      <div className={classNames(styles.content, styles.mobile_content)}>
        <h2 className={styles.title}>
          Upgrade Your Wardrobe
          With Our Collection
        </h2>
        <p className={styles.description}>
          Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque lectus quis velit fusce aenean nunc dui
          consectetur. Eu lorem est ullamcorper nisl amet non mollis.
        </p>
        <div className={styles.button_row}>
          <button className={styles.button}>Buy Now</button>
          <Link href={'/products/puma-mcfc-casuals-sweat-pantspuma-mcfc-casuals-sweat-pants'}
                className={styles.empty_btn}>View Detail</Link>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Image src={smallSlideImg} className={styles.slide_img_small} alt={'Slider'}/>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Upgrade Your Wardrobe
            With Our Collection
          </h2>
          <p className={styles.description}>
            Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque lectus quis velit fusce aenean nunc dui
            consectetur. Eu lorem est ullamcorper nisl amet non mollis.
          </p>
          <div className={styles.button_row}>
            <button className={styles.button}>Buy Now</button>
            <Link href={'/products/puma-mcfc-casuals-sweat-pantspuma-mcfc-casuals-sweat-pants'} className={styles.empty_btn}>View Detail</Link>
          </div>
        </div>
        <div className={styles.product_box}>
          <div className={styles.circle_box}>
            <div className={styles.circle}>
              <div className={styles.circle_effect}></div>
            </div>
            <div className={styles.dashes}></div>
          </div>
          <ProductCard slug={'puma-mcfc-casuals-sweat-pantspuma-mcfc-casuals-sweat-pants'} isSlide={true}
                       name={data.data.attributes.title} producer={data.data.attributes.producer}
                       rating={data.data.attributes.rating}
                       price={data.data.attributes.price}
                       image={data.data.attributes.preview.data.attributes.url}></ProductCard>
        </div>
      </div>
    </div>
  );
};

export default Slide;