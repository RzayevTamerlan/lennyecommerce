'use client';
import {useFilterOpen, useToggle} from "../../store/store";
import styles from "./Overlay.module.scss"
import classNames from "classnames";

const Overlay = () => {
  const isFilterOpen = useFilterOpen(state => state.isFilterOpen);
  const isBurgerOpen = useToggle(state => state.isBurgerOpen);
  const closeFilter = useFilterOpen(state => state.closeFilter);
  const closeBurger = useToggle(state => state.closeBurger);
  const handleOverlayClick = () => {
    closeFilter();
    closeBurger();
  }
  return (
    <div onClick={handleOverlayClick} className={classNames(styles.overlay, {
      [styles.overlay_open]: isFilterOpen || isBurgerOpen,
    })}>

    </div>
  );
};

export default Overlay;