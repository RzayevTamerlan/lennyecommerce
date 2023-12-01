'use client';
import {useEffect, useState} from "react";
import styles from "./BasketItems.module.scss"
import BasketItem from "../BasketItem/BasketItem";
import {useBasket} from "../../../store/store";

const BasketItems = ({isUserLoggedIn}) => {
  const [localProducts, setLocalProducts] = useState([]);
  const isBasketChanged = useBasket(state => state.basketProducts);
  useEffect(() => {
    const allLocalStorageProducts = JSON.parse(localStorage.getItem('products'));
    if (allLocalStorageProducts) {
      setLocalProducts(() => allLocalStorageProducts);
    }
  }, [isBasketChanged]);
  return (
    <ul className={styles.basket_list}>
      {isUserLoggedIn ? localProducts.map((product) => (
        <li key={product.slug} className={styles.product_item}>
          <BasketItem preview={product.preview} quantity={product.quantity} color={product.color}
                      merchant={product.merchant} isUserLoggedIn={isUserLoggedIn} title={product.title}
                      slug={product.slug} price={product.price} type={product.type}/>
        </li>
      )) : null}
    </ul>
  );
};

export default BasketItems;