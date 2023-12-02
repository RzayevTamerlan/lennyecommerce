"use client"
import styles from "./Burger.module.scss"
import Logo from "../Logo/Logo";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import {useAuto, useToggle, useUser} from "../../store/store";
import userIcon from "../../public/icons/user/user.svg"
import closeIcon from "../../public/icons/close/close.svg"
import userPic from "../../public/icons/user/user-icon.jpg"
import {useEffect, useState} from "react";
import {getCookie, getUser} from "../../actions/auth";
import {setToken} from "../../api/createAxios";
import purches from "../../public/icons/user/purches.svg";
import wishlist from "../../public/icons/user/wishlist.svg";
import settings from "../../public/icons/user/settings.svg";

const Burger = ({isActive}) => {
  const isUserLoggedIn = useUser((state) => state.isUserRegistered);
  const [user, setUser] = useState('');
  useEffect(() => {
    const getUserData = async () => {
      const token = await getCookie();
      if (isUserLoggedIn) {
        const res = await getUser(token?.value);
        await setUser(res);
      }
    }
    getUserData();
  }, [isUserLoggedIn]);
  const closeModal = useToggle((state) => state.toggleBurger);
  const openAuth = useAuto((state) => state.openAuto);
  return (
    <div className={classNames(styles.burger, {
      [styles.burger_active]: isActive
    })}>
      <div className={styles.inner}>
        <button onClick={closeModal} className={styles.close}>
          <Image width={25} height={25} src={closeIcon} alt={'Close burger menu'}/>
        </button>
        <Logo/>
        {
          isUserLoggedIn ? (<>
              <button className={styles.user_btn}>
                <Image className={styles.user_img} src={isUserLoggedIn ? userPic : userIcon} alt={'User image'}/>
                <p className={styles.user_name}>{user.username}</p>
              </button>
              <ul className={styles.user_list}>
                <li className={styles.user_item}>
                  <Link className={styles.user_link} href={'#'}>
                    <Image className={styles.user_item_img} alt={'Purches'} src={purches}/>
                    Purchase
                  </Link>
                </li>
                <li className={styles.user_item}>
                  <Link className={styles.user_link} href={'/wishlist'}>
                    <Image className={styles.user_item_img} alt={'Wishlist'} src={wishlist}/>
                    Wishlist
                  </Link>
                </li>
                <li className={styles.user_item}>
                  <Link className={styles.user_link} href={'#'}>
                    <Image className={styles.user_item_img} alt={'Settings'} src={settings}/>
                    Settings
                  </Link>
                </li>
              </ul>
            </>)
            :
            <button onClick={() => openAuth()} className={styles.user_btn_not_logged}>
              <Image src={isUserLoggedIn ? userIcon : userIcon} alt={'User image'}/>
              Login to your account
            </button>
        }
      </div>
    </div>
  );
};

export default Burger;