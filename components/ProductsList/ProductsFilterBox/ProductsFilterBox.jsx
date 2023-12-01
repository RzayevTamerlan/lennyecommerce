'use client';
import {useCallback, useState} from "react";
import {motion} from "framer-motion";
import styles from "./ProductsFilterBox.module.scss";
import TitleText from "../../ui/TitleText/TitleText";
import arrowDown from "../../../public/icons/arrow-down/arrow-down.svg";
import star from "../../../public/icons/product/star.svg"
import Image from "next/image";
import {useRouter, usePathname} from "next/navigation";
import classNames from "classnames";

const ProductsFilterBox = ({title, list, allSearchParams, type, isPriceRange = false, isComment = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const variants = {
    open: {maxHeight: '500px'},
    closed: {maxHeight: '55px'},
  }
  const ulVariants = {
    open: {maxHeight: '500px'},
    closed: {maxHeight: '175px'},
  }
  const router = useRouter();
  const pathname = usePathname();
  const handleFilterBlockOpen = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  }
  const handleInputChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.checked) {
      if (allSearchParams[type] === undefined) {
        router.push(pathname + `?${new URLSearchParams({
          ...allSearchParams,
          [type]: e.target.name,
          page: '1'
        })}`, {scroll: false});
        return;
      }
      if (allSearchParams[type] === '') {
        router.push(pathname + `?${new URLSearchParams({
          ...allSearchParams,
          [type]: e.target.name,
          page: '1'
        })}`, {scroll: false});
        return;
      }
      const params = allSearchParams[type].split(',');
      params.push(e.target.name);
      if (params.includes('all-categories')) {
        params.splice(params.indexOf('all-categories'), 1);
      }
      const newCategories = params.join(',');
      router.push(pathname + `?${new URLSearchParams({
        ...allSearchParams,
        [type]: newCategories,
        page: '1'
      })}`, {scroll: false});
    } else {
      const params = allSearchParams[type].split(',');
      const newCategories = params.filter((param) => param !== e.target.name).join(',');
      router.push(pathname + `?${new URLSearchParams({
        ...allSearchParams,
        [type]: newCategories,
        page: '1'
      })}`, {scroll: false});
    }
  }, [allSearchParams, pathname, router, type])
  const handlePriceFormSubmit = useCallback((e) => {
    e.preventDefault();
    const minPrice = e.target.minprice.value;
    const maxPrice = e.target.maxprice.value;
    if (minPrice === '' && maxPrice === '') {
      router.push(pathname + `?${new URLSearchParams({
        ...allSearchParams,
        minPrice: '',
        maxPrice: ''
      })}`, {scroll: false});
      return;
    }
    if (minPrice === '') {
      router.push(pathname + `?${new URLSearchParams({...allSearchParams, minPrice: '', maxPrice})}`, {scroll: false});
      return;
    }
    if (maxPrice === '') {
      router.push(pathname + `?${new URLSearchParams({...allSearchParams, minPrice, maxPrice: ''})}`, {scroll: false});
      return;
    }
    router.push(pathname + `?${new URLSearchParams({...allSearchParams, minPrice, maxPrice})}`, {scroll: false});
  }, [allSearchParams, pathname, router]);
  const handleClearPriceFilter = useCallback((e) => {
    e.preventDefault();
    router.push(pathname + `?${new URLSearchParams({
      ...allSearchParams,
      minPrice: '',
      maxPrice: ''
    })}`, {scroll: false});
  }, [allSearchParams, pathname, router]);
  const handlePriceClick = useCallback((e, min, max) => {
    e.preventDefault();
    router.push(pathname + `?${new URLSearchParams({
      ...allSearchParams,
      minPrice: min,
      maxPrice: max
    })}`, {scroll: false});
  }, [allSearchParams, pathname, router]);
  return (
    <motion.div animate={isOpen ? "open" : "closed"}
                variants={variants}
                className={styles.wrapper}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30
                }}>
      <div className={styles.box_header}>
        <button onClick={(e) => handleFilterBlockOpen(e)} className={styles.close_btn}>
          <TitleText text={title} isCenter={false} size={'sm'}/>
          <Image className={classNames(styles.arrow, {
            [styles.arrow_open]: isOpen,
          })} src={arrowDown} alt={'Close or open menu'}/>
        </button>
      </div>
      <div className={styles.box_body}>
        {isPriceRange ?
          <div className={styles.price_box}>
            <form onSubmit={(e) => handlePriceFormSubmit(e)} className={styles.price_form}>
              <input className={styles.price_input} type="number" min={0} placeholder={'Minimum price in USD'}
                     name={'minprice'}/>
              <input className={styles.price_input} type="number" max={100000} placeholder={'Maximum price in USD'}
                     name={'maxprice'}/>
              <div className={styles.btn_row}>
                <button className={styles.apply_filter} type={'submit'}>Apply filter</button>
                <button onClick={(e) => handleClearPriceFilter(e)} type={"button"} className={styles.apply_filter}>Clear
                  Price Filter
                </button>
              </div>

            </form>
            <div className={styles.price_buttons}>
              <button onClick={(e) => handlePriceClick(e, 0, 200)} className={styles.price_btn}>$0 - $200</button>
              <button onClick={(e) => handlePriceClick(e, 200, 500)} className={styles.price_btn}>$200 - $500</button>
              <button onClick={(e) => handlePriceClick(e, 500, 1500)} className={styles.price_btn}>$500 - $1500</button>
            </div>
          </div>
          :
          <motion.ul animate={isExtended ? "open" : "closed"}
                     variants={ulVariants}
                     transition={{
                       type: "spring",
                       stiffness: 260,
                       damping: 20
                     }} className={styles.box_list}>
            {list.map((item) => {
              if (allSearchParams[type] === undefined) {
                allSearchParams[type] = '';
              } else {
                const params = allSearchParams[type].split(',');
                item.checked = params.includes(item.attributes.slug);
              }
              return (
                <li key={item.id} className={styles.box_item}>
                  <form className={styles.form}>
                    <input checked={item.checked} onChange={(e) => handleInputChange(e)} type="checkbox"
                           name={item.attributes.slug}
                           id={item.attributes.slug}/>
                    <label className={classNames(styles.titles)} htmlFor={item.attributes.slug}>
                      <label className={classNames(styles.custom_checkbox, {
                        [styles.custom_checkbox_checked]: item.checked,
                      })} htmlFor={item.attributes.slug}></label>
                      {isComment && type !== 'review' ? <Image src={star} alt={'Rating'}/> : null}
                      {item.attributes.title}
                    </label>
                  </form>
                </li>
              )
            })}
          </motion.ul>}
      </div>
      {list.length > 5 && isExtended === false ?
        <button onClick={() => setIsExtended((prev) => !prev)} className={classNames(styles.extend, {
          [styles.extend_display]: isPriceRange
        })}>
          Show All
        </button> : null}
    </motion.div>
  );
};

export default ProductsFilterBox;