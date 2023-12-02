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

const AddToBasket = ({
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
      const token = await getCookie();
      const userData = await getUser(token.value);
      const userBasket = await getAllBasketProducts(userData?.username);
      const productIndex = userBasket.data.findIndex((product) => product.attributes.slug === slug.slug);
      if (productIndex === -1) {
        const addProduct = await addToBasket(title, slug.slug, preview, activeColor, activeType, price, merchant, userData?.username);
        toast('Your product was added to your basket!', {
          autoClose: 2000,
        });
        basketChanged(['random']);
      } else {
        const incrementing = await incrementBasketItem(slug.slug, userData?.username);
        toast('Your product was added one more time to your basket!', {
          autoClose: 2000,
        });
      }
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