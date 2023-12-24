"use client";
import styles from "./BasketSummary.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import ProductLine from "../../ProductPage/ProductLine/ProductLine";
import {useEffect, useRef, useState} from "react";
import {useBasket, useUser} from "../../../store/store";
import Image from "next/image";
import arrowRightIcon from "../../../public/icons/basket/green-arrow-right.svg"
import {toast, ToastContainer} from "react-toastify";
import {getCookie, getUser} from "../../../actions/auth";
import getAllBasketProducts from "../../../api/getAllBasketProducts";
import {loadStripe} from "@stripe/stripe-js";
import checkout from "../../../api/checkout";

const BasketSummary = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);
  const [texAndFees, setTexAndFees] = useState(0);
  const [totalPriceAPI, setTotalPriceAPI] = useState(0);
  const [totalPriceWithDiscountAPI, setTotalPriceWithDiscountAPI] = useState(0);
  const [texAndFeesAPI, setTexAndFeesAPI] = useState(0);
  const [productsNames, setProductsNames] = useState([]);
  const [productsNamesApi, setProductsNamesApi] = useState([]);
  const isBasketChanged = useBasket(state => state.basketProducts);
  const inputRef = useRef(null);
  const isUserLoggedIn = useUser(state => state.isUserRegistered);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const discount = JSON.parse(localStorage.getItem('discount'));
    if (discount) {
      toast('You already have discount!');
      return;
    } else {
      const inputValue = inputRef.current.value;
      if (inputValue === 'Welcome') {
        if (!isUserLoggedIn) {
          const totalPriceWithDiscount = totalPrice - totalPrice * 20 / 100;
          setTotalPriceWithDiscount(() => +(totalPriceWithDiscount).toFixed(2));
          toast('Discount applied!');
          localStorage.setItem('discount', JSON.stringify({value: 20}));
        } else {
          const totalPriceWithDiscount = totalPriceAPI - totalPriceAPI * 20 / 100;
          setTotalPriceWithDiscountAPI(() => +(totalPriceWithDiscount).toFixed(2));
          toast('Discount applied!');
          localStorage.setItem('discount', JSON.stringify({value: 20}));
        }
      } else {
        toast('Discount not found!');
      }
    }
  }
  const handlePayment = async (e) => {
    try {
      if (isUserLoggedIn) {
        const stripePromise = await loadStripe('pk_test_51O8hu5KpBEhiyT2byI2Gu8iUpvAYGnDke992dKhpCntfGzLu03dNcvVW7lDN6499NCmdvaNwYWYgZOD828gfvzlF00nQVR9OvW');
        const token = await getCookie();
        const userData = await getUser(token?.value);
        const basketData = await getAllBasketProducts(userData?.username);
        console.log(basketData.data)
        const stripe = await stripePromise;
        const res = await checkout(basketData.data);
        console.log(res.stripeSession.id, 'RES')
        await stripe.redirectToCheckout({
          sessionId: res.stripeSession.id
        })
      } else {
        toast('You need to be logged in to make your purchase!');
      }
    } catch (e) {
      console.log('ERROR', e);
    }
  }
  useEffect(() => {
    (async () => {
      if (!isUserLoggedIn) {
        const allProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
        if (allProductsFromLocalStorage) {
          setProductsNames(() => allProductsFromLocalStorage?.map((product) => {
            return {
              title: product.title,
              price: product.price,
              quantity: product.quantity,
              type: product.type,
              color: product.color
            }
          }));
          const discount = JSON.parse(localStorage.getItem('discount'));
          const totalPrice = allProductsFromLocalStorage?.reduce((acc, product) => {
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
      } else {
        const token = await getCookie();
        const userData = await getUser(token?.value);
        const allUserBasket = await getAllBasketProducts(userData?.username);
        const discount = JSON.parse(localStorage.getItem('discount'));
        if (allUserBasket?.data.length > 0) {
          setProductsNamesApi(() => allUserBasket?.data.map((product) => {
            return {
              title: product.attributes.title,
              price: product.attributes.price,
              quantity: product.attributes.quantity,
              type: product.attributes.type,
              color: product.attributes.color
            }
          }))
          const totalPrice = allUserBasket?.data.reduce((acc, product) => {
            return acc + product.attributes.price * product.attributes.quantity
          }, 0);
          // console.log(totalPrice, "TOTAL PRICE");
          setTotalPriceAPI(totalPrice.toFixed(2) * 1);
          if (discount) {
            const totalPriceWithDiscount = totalPrice - totalPrice * discount.value / 100;
            setTotalPriceWithDiscountAPI(() => +totalPriceWithDiscount.toFixed(2));
          } else {
            setTotalPriceWithDiscountAPI(() => +totalPrice.toFixed(2));
          }
          const texAndFees = totalPrice * 0.1;
          setTexAndFeesAPI(() => +texAndFees.toFixed(2));
        }
      }
    })()

  }, [isBasketChanged, isUserLoggedIn]);
  return (
    <div className={styles.wrapper}>
      <ToastContainer/>
      <div className={styles.header}>
        <TitleText size={'xs'} isCenter={false} text={'Product Summary'}/>
        <ul className={styles.products_list}>
          {!isUserLoggedIn ? productsNames.map((name) => (
            <li key={`${name.title}${name.color}${name.type}`} className={styles.products_item}>
              <p className={styles.product_name}>
                {name.title}
                {name.quantity > 1 ? ` x ${name.quantity}` : null}
              </p>
              <p className={styles.product_name}>
                ${(name.price * name.quantity).toFixed(2)}
              </p>
            </li>
          )) : <h3 className={styles.add_product}>No products</h3>}
          {isUserLoggedIn ? productsNamesApi.map((name) => (
            <li key={`${name.title}${name.type}${name.color}`} className={styles.products_item}>
              <p className={styles.product_name}>
                {name.title}
                {name.quantity > 1 ? ` x ${name.quantity}` : null}
              </p>
              <p className={styles.product_name}>
                ${(name.price * name.quantity).toFixed(2)}
              </p>
            </li>
          )) : <h3 className={styles.add_product}>No products</h3>}
        </ul>
      </div>
      <ProductLine isBasket={true}/>
      <div className={styles.body}>
        <div className={styles.row}>
          <SecondaryText text={'Total Price'} size={'sm'} isCenter={false}/>
          <SecondaryText text={`$${!isUserLoggedIn ? totalPrice : (totalPriceAPI + totalPriceAPI * 0.1).toFixed(2)}`}
                         size={'sm'}
                         isCenter={false}/>
        </div>
        <div className={styles.row}>
          <SecondaryText text={'Total Price (Discount)'} size={'sm'} isCenter={false}/>
          <SecondaryText
            text={`$${!isUserLoggedIn ? totalPriceWithDiscount : (totalPriceWithDiscountAPI + totalPriceWithDiscountAPI * 0.1).toFixed(2)}`}
            size={'sm'}
            isCenter={false}/>
        </div>
        <div className={styles.row}>
          <SecondaryText text={'Tax & Fee'} size={'sm'} isCenter={false}/>
          <SecondaryText text={`$${!isUserLoggedIn ? texAndFees : texAndFeesAPI}`} size={'sm'} isCenter={false}/>
        </div>
      </div>
      <ProductLine isBasket={true}/>
      <div className={styles.footer}>
        <div className={styles.row}>
          <TitleText text={'Total Price'} size={'xs'} isCenter={false}/>
          <TitleText
            text={`$${!isUserLoggedIn ? totalPriceWithDiscount : (totalPriceWithDiscountAPI + totalPriceWithDiscountAPI * 0.1).toFixed(2)}`}
            size={'xs'}
            isCenter={false}/>
        </div>
        <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
          <input ref={inputRef} placeholder={'Enter promo...'} className={styles.voucher} type="text"/>
        </form>
        <button onClick={handlePayment} className={styles.checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default BasketSummary;