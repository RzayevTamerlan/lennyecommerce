"use client"
import styles from "./HeaderBtns.module.scss"
import Link from "next/link";
import Image from "next/image";
import basketIcon from "../../../public/icons/basket/basket.svg";
import notificationIcon from "../../../public/icons/notification/notification.svg"
import emailIcon from "../../../public/icons/email/email.svg"
import userIcon from "../../../public/icons/user/user.svg";
import classNames from "classnames";
import {useAuto, useBasket, useToggle, useUser, useUserMenu} from "../../../store/store";
import userPic from "../../../public/icons/user/user-icon.jpg";
import {useEffect, useState} from "react";
import {getCookie} from "../../../actions/auth";

const HeaderBtns = () => {
  const isUserLoggedIn = useUser(state => state.isUserRegistered);
  const registerUser = useUser(state => state.registerUser);
  const unregisterUser = useUser(state => state.unregisterUser);
  const setBurgerMenu = useToggle((state) => state.toggleBurger);
  const setAuthOpen = useAuto((state) => state.openAuto);
  const toggleUserMenu = useUserMenu(state => state.toggleUserMenu);
  const basketChanged = useBasket(state => state.basketProducts);
  const [localbasketCount, setLocalBasketCount] = useState(0);
  console.log(basketChanged)
  useEffect(() => {
    const checkForCookie = async () => {
      const token = await getCookie();
      if (token !== 'No Cookie Found') {
        registerUser();
      } else {
        unregisterUser();
      }
    }
    checkForCookie();
  }, [isUserLoggedIn]);
  useEffect(() => {
    const allLocalStorageProducts = JSON.parse(localStorage.getItem('products'));
    if (allLocalStorageProducts) {
      const basketCount = allLocalStorageProducts.length
      setLocalBasketCount(basketCount);
    } else {

    }
  }, []);
  useEffect(() => {
    const allLocalStorageProducts = JSON.parse(localStorage.getItem('products'));
    if (allLocalStorageProducts) {
      const basketCount = allLocalStorageProducts.length
      setLocalBasketCount(basketCount);
    } else {
      setLocalBasketCount(0);
    }
  }, [basketChanged])
  const handleUnregisterUserClick = async (e) => {
    e.preventDefault();
    setAuthOpen();
  }
  const handleRegisteredUserClick = (e) => {
    e.preventDefault();
    toggleUserMenu();
  }
  return (<div className={styles.header_btns}>
    <Link className={styles.basket} href={'/basket/'}>
      <Image alt={'Basket'} src={basketIcon}></Image>
      <span className={styles.basket_count}>{isUserLoggedIn ? 5 : localbasketCount}</span>
    </Link>
    {isUserLoggedIn ? <><Link href={'#'}><Image src={notificationIcon}
                                                alt={'Notifications'}></Image></Link>
      <Link
        href={'#'}> <Image src={emailIcon}
                           alt={'Email'}></Image></Link></> : null}
    <span className={styles.bordering}></span>
    <button
      onClick={isUserLoggedIn ? (e) => handleRegisteredUserClick(e) : (e) => handleUnregisterUserClick(e)}
      className={classNames(styles.user, {
        [styles.user_icon]: isUserLoggedIn,
        [styles.user_logged_in]: isUserLoggedIn
      })}>
      <Image className={styles.user_pic} alt={'User'} src={isUserLoggedIn ? userPic : userIcon}/>
    </button>
    <button onClick={setBurgerMenu} className={styles.burger}>
      <div className={styles.burger_row}></div>
      <div className={styles.burger_row}></div>
      <div className={styles.burger_row}></div>
    </button>
  </div>);
};

export default HeaderBtns;