"use client";
import styles from "./BasketItem.module.scss";
import {useBasket} from "../../../store/store";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/icons/product/merchant-logo.png"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import minusIcon from "../../../public/icons/basket/minus-square.svg";
import plusIcon from "../../../public/icons/basket/add-square.svg";
import {useState} from "react";
import trashIcon from "../../../public/icons/basket/trash.svg";

const BasketItem = ({title, slug, preview, merchant, price, quantity, type, color, isUserLoggedIn}) => {
  const [inputValue, setInputValue] = useState(quantity);
  const basketChanged = useBasket((state) => state.basketChanged);
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${src}`
  }
  const handleInputChange = (e) => {
    if (isUserLoggedIn === 'Error') {
      const allProducts = JSON.parse(localStorage.getItem('products'));
      const productIndex = allProducts.findIndex((product) => product.slug === slug);
      allProducts[productIndex].quantity = +e.target.value;
      localStorage.setItem('products', JSON.stringify(allProducts));
      setInputValue(() => e.target.value);
      basketChanged(['random'])
    } else {

    }
  }
  const handleIncrementClick = (e) => {
    e.preventDefault();
    if (isUserLoggedIn === 'Error') {
      if (+inputValue === 99) return;
      const allProducts = JSON.parse(localStorage.getItem('products'));
      const productIndex = allProducts.findIndex((product) => product.slug === slug);
      allProducts[productIndex].quantity = +inputValue + 1;
      localStorage.setItem('products', JSON.stringify(allProducts));
      setInputValue(() => +inputValue + 1);
      basketChanged(['random'])
    } else {

    }
  }
  const handleDecrementClick = (e) => {
    e.preventDefault();
    if (isUserLoggedIn === 'Error') {
      const allProducts = JSON.parse(localStorage.getItem('products'));
      const productIndex = allProducts.findIndex((product) => product.slug === slug);
      if (+inputValue > 1) {
        allProducts[productIndex].quantity = +inputValue - 1;
        localStorage.setItem('products', JSON.stringify(allProducts));
        setInputValue(() => +inputValue - 1);
        basketChanged(['random'])
      }
    } else {

    }
  }
  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (isUserLoggedIn === 'Error') {
      const allProducts = JSON.parse(localStorage.getItem('products'));
      const productIndex = allProducts.findIndex((product) => product.slug === slug);
      allProducts.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(allProducts));
      basketChanged(['random'])
    } else {

    }
  }
  return (
    <div className={styles.product}>
      <div className={styles.product_header}>
        <div className={styles.product_logo}>
          <Image src={logo} alt="logo" width={46} height={46}/>
        </div>
        <div className={styles.product_info}>
          <TitleText size={'xs'} isCenter={false} text={merchant}/>
          <SecondaryText text={'Central Jakarta'}/>
        </div>
      </div>
      <div className={styles.product_body}>
        <div className={styles.product_left}>
          <div className={styles.product_image_box}>
            <Image loader={myLoader} className={styles.product_image} src={preview} alt={title} width={84} height={84}/>
          </div>
          <div className={styles.product_details}>
            <Link href={`/products/${slug}`} className={styles.product_name}>
              <TitleText size={'sm'} isCenter={false} text={title}/>
              <SecondaryText text={`${type}, ${color}`} size={'sm'} isCenter={false}/>
            </Link>
            <p className={styles.product_price}>
              ${price}
            </p>
          </div>
        </div>
        <div className={styles.product_right}>
          <div className={styles.products_quantity_btns}>
            <button onClick={(e) => handleDecrementClick(e)} className={styles.quantity_btn}>
              <Image src={minusIcon} alt="minus" width={28} height={28}/>
            </button>
            <button className={styles.quantity_btn}>
              <input onChange={(e) => handleInputChange(e)} value={inputValue} min={1} max={99} type="number"
                     className={styles.input_value}/>
            </button>
            <button onClick={(e) => handleIncrementClick(e)} className={styles.quantity_btn}>
              <Image src={plusIcon} alt="plus" width={28} height={28}/>
            </button>
          </div>
          <button onClick={(e) => handleDeleteClick(e)} className={styles.delete_product}>
            <Image src={trashIcon} alt="trash" width={24} height={24}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;