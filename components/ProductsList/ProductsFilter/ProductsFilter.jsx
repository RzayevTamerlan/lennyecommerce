'use client';
import styles from "./ProductsFilter.module.scss";
import Image from "next/image";
import closeIcon from "../../../public/icons/close/close.svg"
import ProductsFilterBox from "../ProductsFilterBox/ProductsFilterBox";
import {useFilterOpen} from "../../../store/store";
import classNames from "classnames";

const ProductsFilter = ({allCategories, bestFilters, allLocations, allSearchParams, isComments}) => {
  const isOpen = useFilterOpen((state) => state.isFilterOpen);
  const closeFilter = useFilterOpen(state => state.toggleFilter)
  const handleFilterClose = (e) => {
    e.preventDefault();
    closeFilter();
  }
  return (
    <aside className={classNames(styles.aside, {
      [styles.aside_open]: isOpen,
    })}>
      <div className={styles.inner}>
        <h3 className={styles.aside_title}>Filter Option</h3>
        <ProductsFilterBox type={'bestfilter'} list={bestFilters} allSearchParams={allSearchParams}
                           title={'Best Filters'}/>
        <ProductsFilterBox type={'location'} list={allLocations} allSearchParams={allSearchParams}
                           title={'Location'}/>
        <ProductsFilterBox type={'category'} list={allCategories} allSearchParams={allSearchParams}
                           title={'Category'}/>
        <ProductsFilterBox isPriceRange={true} list={allCategories} allSearchParams={allSearchParams}
                           title={'Price Range'}/>
      </div>
      <button onClick={(e) => handleFilterClose(e)} className={styles.close_btn}>
        <Image className={styles.close_img} src={closeIcon} alt={'Close'}/>
      </button>
    </aside>
  );
};

export default ProductsFilter;