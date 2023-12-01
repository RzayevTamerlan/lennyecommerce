import styles from "./ProductInfo.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import starIcon from "../../../public/icons/ratingStar/ratingStar.svg";
import Image from "next/image";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import ProductVariants from "../ProductVariants/ProductVariants";
import shopingCartIcon from "../../../public/icons/product/shopping-cart.svg";
import {getUser} from "../../../actions/auth";
import AddToBasket from "../AddToBasket/AddToBasket";

const ProductInfo = async ({
                             title,
                             preview,
                             slug,
                             rating,
                             description,
                             price,
                             type,
                             allParams,
                             types,
                             color,
                             colors,
                             merchant
                           }) => {
  const activeType = allParams.Type ? allParams.Type : type;
  const activeColor = allParams.Color ? allParams.Color : color;
  const isUserLoggedIn = await getUser();
  return (
    <div className={styles.wrapper}>
      <TitleText text={title} isCenter={false} size={'lg'}/>
      <div className={styles.rating_row}>
        <Image className={styles.rating_icon} alt={'Rating'} src={starIcon}/>
        <p className={styles.rating}>{rating}</p>
        <div className={styles.dot}></div>
        <p className={styles.rating}>1,238 Sold</p>
      </div>
      <h4 className={styles.price}>
        ${price}
      </h4>
      <SecondaryText text={description} size={'sm'} isCenter={false}/>
      <div className={styles.line}></div>
      <TitleText text={'Product Variant:'} size={'sm'} isCenter={false}/>
      <div className={styles.variant_row}>
        <ProductVariants slug={slug} whichParam={'Type'} allParams={allParams} variants={types} type={type}
                         activeVariant={activeType}/>
        <ProductVariants slug={slug} whichParam={'Color'} allParams={allParams} variants={colors} type={color}
                         activeVariant={activeColor}/>
      </div>
      <AddToBasket preview={preview} activeType={activeType} activeColor={activeColor} price={price} title={title}
                   slug={slug}
                   merchant={merchant}
                   rating={rating} description={description} isUserLoggedIn={isUserLoggedIn}/>
    </div>
  );
};

export default ProductInfo;