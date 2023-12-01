"use client";
import styles from "./BasketSummary.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import ProductLine from "../../ProductPage/ProductLine/ProductLine";
import {useEffect, useRef, useState} from "react";
import {useBasket} from "../../../store/store";
import Image from "next/image";
import arrowRightIcon from "../../../public/icons/basket/green-arrow-right.svg"
import {toast, ToastContainer} from "react-toastify";

const BasketSummary = ({isUserLoggedIn}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);
  const [texAndFees, setTexAndFees] = useState(0);
  const [productsNames, setProductsNames] = useState([]);
  const isBasketChanged = useBasket(state => state.basketProducts);
  const inputRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const discount = JSON.parse(localStorage.getItem('discount'));
    if (discount) {
      toast('You already have discount!');
      return;
    } else {
      const inputValue = inputRef.current.value;
      if (inputValue === 'Welcome') {
        const totalPriceWithDiscount = totalPrice - totalPrice * 20 / 100;
        setTotalPriceWithDiscount(() => +(totalPriceWithDiscount).toFixed(2));
        toast('Discount applied!');
        localStorage.setItem('discount', JSON.stringify({value: 20}));
      } else {
        toast('Discount not found!');
      }
    }
  }
  useEffect(() => {
    if (isUserLoggedIn === 'Error') {
      const allProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
      setProductsNames(() => allProductsFromLocalStorage.map((product) => {
        return {title: product.title, price: product.price}
      }));
      const discount = JSON.parse(localStorage.getItem('discount'));
      if (allProductsFromLocalStorage) {
        const totalPrice = allProductsFromLocalStorage.reduce((acc, product) => {
          return acc + product.price * product.quantity
        }, 0);
        setTotalPrice(() => +totalPrice.toFixed(2));
        if (discount) {
          const totalPriceWithDiscount = totalPrice - totalPrice * discount.value / 100;
          setTotalPriceWithDiscount(() => +totalPriceWithDiscount.toFixed(2));
        } else {
          setTotalPriceWithDiscount(() => +totalPrice.toFixed(2));
        }
        const texAndFees = totalPrice * 0.1;
        setTexAndFees(() => +texAndFees.toFixed(2));
        setTotalPrice((prev) => +(prev + texAndFees).toFixed(2));
        setTotalPriceWithDiscount((prev) => +(prev + texAndFees).toFixed(2));
      }
    }
  }, [isBasketChanged]);
  return (
    <div className={styles.wrapper}>
      <ToastContainer/>
      <div className={styles.header}>
        <TitleText size={'xs'} isCenter={false} text={'Product Summary'}/>
        <ul className={styles.products_list}>
          {productsNames.map((name) => (
            <li key={name.title} className={styles.products_item}>
              <p className={styles.product_name}>
                {name.title}
              </p>
              <p className={styles.product_name}>
                ${name.price}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <ProductLine isBasket={true}/>
      <div className={styles.body}>
        <div className={styles.row}>
          <SecondaryText text={'Total Price'} size={'sm'} isCenter={false}/>
          <SecondaryText text={`$${totalPrice}`} size={'sm'} isCenter={false}/>
        </div>
        <div className={styles.row}>
          <SecondaryText text={'Total Price (Discount)'} size={'sm'} isCenter={false}/>
          <SecondaryText text={`$${totalPriceWithDiscount}`} size={'sm'} isCenter={false}/>
        </div>
        <div className={styles.row}>
          <SecondaryText text={'Tax & Fee'} size={'sm'} isCenter={false}/>
          <SecondaryText text={`$${texAndFees}`} size={'sm'} isCenter={false}/>
        </div>
      </div>
      <ProductLine isBasket={true}/>
      <div className={styles.footer}>
        <div className={styles.row}>
          <TitleText text={'Total Price'} size={'xs'} isCenter={false}/>
          <TitleText text={`$${totalPriceWithDiscount}`} size={'xs'} isCenter={false}/>
        </div>
        <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
          <input ref={inputRef} placeholder={'Enter promo...'} className={styles.voucher} type="text"/>
        </form>
        <button className={styles.checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default BasketSummary;