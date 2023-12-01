'use client';
import Image from "next/image";
import shopingCartIcon from "../../../public/icons/product/shopping-cart.svg";
import styles from "./AddtoBasket.module.scss"
import {useBasket} from "../../../store/store";
import {toast, ToastContainer} from "react-toastify";

const AddToBasket = ({
                       isUserLoggedIn,
                       merchant,
                       preview,
                       price,
                       title,
                       slug,
                       rating,
                       description,
                       activeColor,
                       activeType
                     }) => {
  // const incrementBasket = useBasket(state => state.incrementBasket);
  // const addToBasket = useBasket(state => state.addProduct);
  const basketChanged = useBasket(state => state.basketChanged);
  const handleAddClick = (e) => {
    e.preventDefault();
    if (!isUserLoggedIn.email) {
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
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      const productIndex = allProducts.findIndex((product) => product.slug === slug.slug);

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
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        allProducts[productIndex].quantity += 1;
        localStorage.setItem('products', JSON.stringify(allProducts));
        basketChanged(['random']);
        toast('Your product was added to your basket!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      // Adding to basket for logged in user by using API
    }
  }
  return (
    <>
      <ToastContainer/>
      <div className={styles.btn_row}>
        <button className={styles.btn_green}>Buy now</button>
        <button onClick={(e) => handleAddClick(e)} className={styles.btn_empty}>
          <Image className={styles.basket} src={shopingCartIcon} alt={'Shopping Cart'}/>
          Add to Chart
        </button>
      </div>
    </>

  );
};

export default AddToBasket;