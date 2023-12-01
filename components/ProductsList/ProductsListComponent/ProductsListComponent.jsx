'use client'
import styles from "./ProductsListComponent.module.scss";
import {motion} from "framer-motion";
import classNames from "classnames";
import ProductCard from "../../ProductCard/ProductCard";
import Link from "next/link";
import Image from "next/image";
import arrowRightGreen from "../../../public/icons/green-arrow-right/green-arrow-right.svg"

const ProductsListComponent = ({products, view, pagination, allParams}) => {
  const pages = Array.from({length: pagination.pageCount}, (_, index) => index + 1);
  return (
    <div className={styles.wrapper}>
      <ul className={classNames(styles.list, {
        [styles.list_grid]: view === 'grid',
        [styles.list_line]: view === 'line',
      })}>
        {products.map((product) => {
          return (
            <motion.li initial={{opacity: 0, left: -20}}
                       animate={{opacity: 1}}
                       exit={{opacity: 0}}
                       layout
                       transition={{duration: 0.5}}
                       key={product.id}>
              <ProductCard uniId={product.id} wish={false} price={product.attributes.price} isSlide={false}
                           producer={product.attributes.producer}
                           rating={product.attributes.rating}
                           slug={`${product.attributes.slug}?search=${allParams.search}`}
                           image={product.attributes.preview.data.attributes.url} name={product.attributes.title}/>
            </motion.li>
          )
        })}
      </ul>
      <div className={styles.pagination}>
        {pagination.page !== 1 && pagination.total > 0 && pagination.pageCount > 1 ? (
          <Link href={`?${new URLSearchParams({...allParams, page: pagination.page - 1}).toString()}`}>
            <Image src={arrowRightGreen} alt={'Prev Page'} className={styles.arrow_left}/>
          </Link>) : null}
        {pages.map((pageNumber) => (
          <Link
            href={`?${new URLSearchParams({...allParams, page: pageNumber}).toString()}`}
            key={pageNumber}
            className={classNames(styles.pagination_btn, {
              [styles.pagination_btn_active]: pageNumber === pagination.page,
            })}
          >
            {pageNumber}
          </Link>
        ))}
        {pagination.page !== 4 && pagination.total > 0 && pagination.pageCount > 1 ? (
          <Link href={`?${new URLSearchParams({...allParams, page: pagination.page + 1}).toString()}`}>
            <Image src={arrowRightGreen} alt={'Prev Page'} className={styles.arrow_right}/>
          </Link>) : null}
      </div>
    </div>

  );
};

export default ProductsListComponent;