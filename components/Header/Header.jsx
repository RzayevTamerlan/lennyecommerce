"use client"
import styles from './Header.module.scss'
import Logo from "../Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import HeaderBtns from "./HeaderBtns/HeaderBtns";
import {useToggle} from "../../store/store";
import Burger from "../Burger/Burger";
import AuthUser from "./AuthUser/AuthUser";

const Header = ({token}) => {
    const isModalOpen = useToggle((state) => state.isBurgerOpen);
    return (
      <header className={styles.header}>
        <div className={'container'}>
          <div className={styles.inner}>
            <div className={styles.logo}>
              <Logo/>
            </div>
            <SearchBar/>
            <HeaderBtns/>
          </div>
        </div>
        <AuthUser/>
        <Burger isActive={isModalOpen}/>
      </header>
    );
  }
;

export default Header;