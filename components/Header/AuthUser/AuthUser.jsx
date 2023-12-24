'use client';
import styles from "./AuthUser.module.scss";
import {useUser, useUserMenu} from "../../../store/store";
import userIcon from "../../../public/icons/user/user-icon-big.jpg";
import Image from "next/image"
import TitleText from "../../ui/TitleText/TitleText";
import {useEffect, useState} from "react";
import {getCookie, getUser, logoutUser} from "../../../actions/auth";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import Link from "next/link";
import purches from "../../../public/icons/user/purches.svg";
import wishlist from "../../../public/icons/user/wishlist.svg";
import settings from "../../../public/icons/user/settings.svg";
import logout from "../../../public/icons/user/logout.svg";
import classNames from "classnames";
import {toast} from "react-toastify";
import {setToken} from "../../../api/createAxios";

const AuthUser = () => {
  const [user, setUser] = useState(null);
  const isModalOpen = useUserMenu((state) => state.isUserMenuOpen);
  const closeModal = useUserMenu((state) => state.closeUserMenu);
  const isUserLoggedIn = useUser(state => state.isUserRegistered);
  console.log('AUTH USER', isUserLoggedIn)
  const unregisterUser = useUser(state => state.unregisterUser);
  useEffect(() => {
    const getUserData = async () => {
      const token = await getCookie();
      const user = await getUser(token?.value);
      console.log(user, 'USER DATA IN AUTH USER');
      setUser(user);
    }
    getUserData();
  }, [isUserLoggedIn]);
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await logoutUser();
    if (res === 'Logged Out') {
      unregisterUser();
      closeModal();
      toast('Logged Out', {
        autoClose: 2000,
      })
    }
  }
  const handleLinkClick = (e) => {
    closeModal();
  }
  return (
    <>
      <div className={classNames(styles.wrapper, {
        [styles.wrapper_active]: isModalOpen
      })}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <Image alt={'User'} src={userIcon} className={styles.user_icon}/>
            <div className={styles.user_data}>
              <TitleText text={user?.username ? user.username : 'Fetching your name. Please, wait...'} isCenter={false}
                         size={'sm'}/>
              <SecondaryText isCenter={false} size={'sm'} text={'User'}/>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.menu}>
            <p className={styles.menu_text}>
              Menu
            </p>
            <ul className={styles.menu_list}>
              <li className={styles.menu_item}>
                <Link onClick={(e) => handleLinkClick(e)} href={'#'} className={styles.menu_link}><Image alt={'Purches'}
                                                                                                         src={purches}
                                                                                                         className={styles.menu_img}/> Purchase</Link>
              </li>
              <li className={styles.menu_item}>
                <Link onClick={(e) => handleLinkClick(e)} href={'/wishlist'} className={styles.menu_link}><Image
                  alt={'Wishlist'} src={wishlist}
                  className={styles.menu_img}/>Wishlist</Link>
              </li>
              <li className={styles.menu_item}>
                <Link onClick={(e) => handleLinkClick(e)} href={'#'} className={styles.menu_link}><Image
                  alt={'Settings'} src={settings}
                  className={styles.menu_img}/>Settings</Link>
              </li>
            </ul>
          </div>
          <div className={styles.line}></div>
          <button onClick={(e) => handleLogout(e)} className={styles.logout}>
            <Image src={logout} alt={'Logout'} className={styles.logout_icon}/>
            Sign Out
          </button>
        </div>
      </div>
    </>

  );
};

export default AuthUser;