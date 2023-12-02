'use client';
import {useEffect, useState} from "react";
import styles from "./BasketItems.module.scss"
import BasketItem from "../BasketItem/BasketItem";
import {useBasket, useUser} from "../../../store/store";
import {getCookie, getUser} from "../../../actions/auth";
import getAllBasketProducts from "../../../api/getAllBasketProducts";


const BasketItems = () => {
  const [localProducts, setLocalProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  const isBasketChanged = useBasket(state => state.basketProducts);
  const isUserLoggedIn = useUser(state => state.isUserRegistered);
  useEffect(() => {
    (async () => {
      if (isUserLoggedIn) {
        const token = await getCookie();
        console.log(token, "TOKEN")
        const userData = await getUser(token?.value);
        console.log(userData, "USER DATA")
        const allProducts = await getAllBasketProducts(userData?.username);
        if (allProducts.data.length > 0) {
          setApiProducts(() => allProducts.data);
        }
      } else {
        const allLocalStorageProducts = JSON.parse(localStorage.getItem('products'));
        if (allLocalStorageProducts) {
          setLocalProducts(() => allLocalStorageProducts);
        }
      }
    })()
  }, [isBasketChanged, isUserLoggedIn]);
  const renderBasketItems = (products) => (
    products.length > 0 ? (
      products.map((product) => (
        <li key={product.id || product.slug} className={styles.product_item}>
          <BasketItem
            preview={product.attributes?.preview || product.preview}
            quantity={product.attributes?.quantity || product.quantity}
            color={product.attributes?.color || product.color}
            merchant={product.attributes?.merchant || product.merchant}
            isUserLoggedIn={isUserLoggedIn}
            title={product.attributes?.title || product.title}
            slug={product.attributes?.slug || product.slug}
            price={product.attributes?.price || product.price}
            type={product.attributes?.type || product.type}
          />
        </li>
      ))
    ) : (
      <h4 className={styles.add}>Add some products to see them here!</h4>
    )
  );
  return (
    <ul className={styles.basket_list}>
      {!isUserLoggedIn && renderBasketItems(localProducts)}
      {isUserLoggedIn && renderBasketItems(apiProducts)}
    </ul>
  );
};

export default BasketItems;