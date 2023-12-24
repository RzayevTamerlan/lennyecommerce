'use client';
import styles from "./ProductCard.module.scss"
import ratingStar from "../../public/icons/ratingStar/ratingStar.svg"
import Image from "next/image";
import heart from "../../public/icons/heart/heart.svg"
import heartRed from "../../public/icons/heart/heart-red.svg"
import classNames from "classnames";
import Link from "next/link";
import {getAllUserData, getCookie} from "../../actions/auth";
import {addToWishlist, findInWishlist, removeFromWishlist} from "../../actions/wishlist";
import {useEffect, useState} from "react";
import {useUser} from "../../store/store";
import {setToken} from "../../api/createAxios";
import {toast, ToastContainer} from "react-toastify";

const ProductCard = ({isSlide, image, name, slug, producer, rating, price, uniId, wish}) => {
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${image}`;
  }
  const isUserLogged = useUser(state => state.isUserRegistered);
  const [isWished, setIsWished] = useState(wish);
  useEffect(() => {
    const isInWishlist = async () => {
      if (isUserLogged === false) return;
      const token = await getCookie();
      if (token !== 'No Cookie Found') {
        await setToken(token.value);
      }
      const user = await getAllUserData(token.value);
      const WishlistId = await user?.wishlist?.id;
      const isInWishlist = await findInWishlist(uniId, WishlistId);
      if (isInWishlist !== 'Error' && isInWishlist) {
        setIsWished(true);
      } else {
        setIsWished(false);
      }
    }
    isInWishlist();
  }, [isWished, uniId, isUserLogged]);
  const handleLinkClick = async (e) => {
    if (e.target.classList.contains('favorit') || e.target.classList.contains('favorit_btn')) {
      e.preventDefault();
      if (!isUserLogged) {
        toast('You need to be logged in to add to wishlist');
        return;
      }
      if (isWished) {
        const token = await getCookie();
        const user = await getAllUserData(token?.value);
        const WishlistId = await user?.wishlist?.id;
        const remove = await removeFromWishlist(uniId, WishlistId);
        await setIsWished(false)
      } else {
        const token = await getCookie();
        const user = await getAllUserData(token?.value);
        const WishlistId = await user?.wishlist?.id;
        const add = await addToWishlist(uniId, WishlistId);
        setIsWished(true)
      }
    }
  }
  return (
    <>
      {isSlide ? null : <ToastContainer/>}
      <Link onClick={(e) => handleLinkClick(e)} href={`/products/${slug}`} className={classNames({
          [styles.product_card]: !isSlide,
          [styles.product_card_slide]: isSlide
        }
      )}>
        <div className={classNames({
          [styles.product_img_background_slide]: isSlide,
          [styles.product_img_background]: !isSlide
        })}>
          <Image className={classNames({
            [styles.product_image_slide]: isSlide,
            [styles.product_image]: !isSlide
          })} loader={myLoader} src={`${process.env.NEXT_PUBLIC_API}${image}`} width={120} height={120} alt={name}/>
          {isSlide ? null : <button className={classNames('favorit_btn', {
            [styles.product_favorite_slide]: isSlide,
            [styles.product_favorite]: !isSlide
          })}>
            <Image className={'favorit'} src={isWished ? heartRed : heart} alt={'Favorite'}/>
          </button>}
        </div>

        <div className={classNames({
          [styles.data]: !isSlide,
          [styles.data_slide]: isSlide
        })}>
          <div className={styles.left}>
            <div className={styles.header}>
              <h3 className={classNames({
                [styles.product_name_slide]: isSlide,
                [styles.product_name]: !isSlide
              })}>{name}</h3>
              {isSlide ? null : <p className={styles.price}>${price}</p>}
            </div>
            <p className={classNames({
              [styles.product_producer_slide]: isSlide,
              [styles.product_producer]: !isSlide
            })}>{producer}</p>
            <div className={styles.rating_sold}>
              <div className={styles.rating}>
                <Image className={classNames({
                  [styles.rating_star_slide]: isSlide,
                  [styles.rating_star]: !isSlide
                })} alt={"Rating star"} src={ratingStar}/>
                <h4 className={classNames({
                  [styles.rating_number_slide]: isSlide,
                  [styles.rating_number]: !isSlide
                })}>{rating}</h4>
              </div>
              <span className={styles.point}></span>
              <p className={classNames({
                [styles.sold_slide]: isSlide,
                [styles.sold]: !isSlide
              })}>1,238 Sold</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;