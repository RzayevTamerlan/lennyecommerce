'use client';
import Image from "next/image";
import shopingCartIcon from "../../../public/icons/product/shopping-cart.svg";
import styles from "./AddtoBasket.module.scss"
import {useBasket, useUser} from "../../../store/store";
import {toast, ToastContainer} from "react-toastify";
import getAllBasketProducts from "../../../api/getAllBasketProducts";
import addToBasket from "../../../api/addToBasket";
import incrementBasketItem from "../../../api/incrementBasketItem";
import {getCookie, getUser} from "../../../actions/auth";
import {loadStripe} from "@stripe/stripe-js";
import checkout from "../../../api/checkout";

const AddToBasket = ({
                       merchant,
                       preview,
                       price,
                       title,
                       slug,
                       rating,
                       activeColor,
                       activeType,
                       productId
                     }) => {
  const basketChanged = useBasket(state => state.basketChanged);
  const isUserLoggedIn = useUser(state => state.isUserRegistered);
  const handleAddClick = async (e) => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      const allProducts = JSON.parse(localStorage.getItem('products'));
      if (!allProducts) {
        const product = {
          title,
          slug: slug.slug,
          rating,
          merchant,
          price,
          type: activeType,
          color: activeColor,
          preview,
          quantity: 1,
        };
        localStorage.setItem('products', JSON.stringify([product]));
        basketChanged(['random']);
        toast('Your product was added to your basket!', {
          autoClose: 2000,
        });
        return;
      }
      const productIndex = allProducts.findIndex((product) => product.slug === slug.slug && product.type === activeType && product.color === activeColor);
      if (productIndex === -1) {
        const product = {
          title,
          slug: slug.slug,
          rating,
          merchant,
          price,
          type: activeType,
          color: activeColor,
          preview,
          quantity: 1,
        };
        allProducts.push(product);
        localStorage.setItem('products', JSON.stringify(allProducts));
        basketChanged(['random']);
        toast('Your product was added to your basket!', {
          autoClose: 2000,
        });
      } else {
        allProducts[productIndex].quantity += 1;
        localStorage.setItem('products', JSON.stringify(allProducts));
        basketChanged(['random']);
        toast('Your product was added to your basket!', {
          autoClose: 2000,
        });
      }
    } else {
      const token = await getCookie();
      const userData = await getUser(token.value);
      const userBasket = await getAllBasketProducts(userData?.username);
      const productIndex = userBasket.data.findIndex((product) => product.attributes.slug === slug.slug && product.attributes.type === activeType && product.attributes.color === activeColor);
      if (productIndex === -1) {
        const addProduct = await addToBasket(title, slug.slug, preview, activeColor, activeType, price, merchant, userData?.username);
        toast('Your product was added to your basket!', {
          autoClose: 2000,
        });
        basketChanged(['random']);
      } else {
        if (userBasket[productIndex]?.attributes?.quantity === 99) return;
        const incrementing = await incrementBasketItem(slug.slug, userData?.username);
        toast('Your product was added one more time to your basket!', {
          autoClose: 2000,
        });
      }
    }
  }
  const handleBuy = async (e) => {
    e.preventDefault();
    if (isUserLoggedIn) {
      const stripePromise = await loadStripe('pk_test_51O8hu5KpBEhiyT2byI2Gu8iUpvAYGnDke992dKhpCntfGzLu03dNcvVW7lDN6499NCmdvaNwYWYgZOD828gfvzlF00nQVR9OvW');
      // const token = await getCookie();
      const product = [
        {
          id: productId,
          attributes: {
            slug: slug.slug,
            type: activeType,
            color: activeColor,
            quantity: 1,
            title,
            price,
            preview,
            merchant,
          }
        }
      ]
      const stripe = await stripePromise;
      const res = await checkout(product);
      console.log(res.stripeSession.id, 'RES')
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id
      })
    } else {
      toast('You need to be logged in to make your purchase!', {
        autoClose: 1000,
      });
    }
  }
  return (
    <>
      <ToastContainer/>
      <div className={styles.btn_row}>
        <button onClick={(e) => handleBuy(e)} className={styles.btn_green}>Buy now</button>
        <button onClick={(e) => handleAddClick(e)} className={styles.btn_empty}>
          <Image className={styles.basket} src={shopingCartIcon} alt={'Shopping Cart'}/>
          Add to Cart
        </button>
      </div>
    </>

  );
};

export default AddToBasket;