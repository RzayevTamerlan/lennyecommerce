'use client';
import Link from "next/link";
import Image from "next/image";
import arrowRight from "../../../public/icons/arrow-right-gray/arrow-right.svg"
import classNames from "classnames";
import styles from "./ProductsListTop.module.scss"
import filterIcon from "../../../public/icons/filter/filter.svg"
import viewGrid from "../../../public/icons/view/grid.svg"
import viewGridBlack from "../../../public/icons/view/grid-black.svg";
import viewLine from "../../../public/icons/view/line.svg";
import viewLineWhite from "../../../public/icons/view/line-white.svg";
import ProductsDropdown from "../ProductsDropdown/ProductsDropdown";
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import {useFilterOpen} from "../../../store/store";

const ProductsListTop = ({
                           searchQuery,
                           total,
                           page,
                           pageSize,
                           searchCategory,
                           searchCategoryTitle,
                           sortBy,
                           allParams,
                           view,
                         }) => {
  const pageStart = page === '1' ? 1 : pageSize * page;
  const formattedCategories = searchCategoryTitle?.split(',').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(', ');
  const pageEnd = page === '1' ? pageSize : +pageSize * (+page + 1);
  const isFilterOpen = useFilterOpen((state) => state.toggleFilter);
  console.log(searchCategoryTitle)
  const handleMenuOpen = (e) => {
    e.preventDefault();
    isFilterOpen();
  }
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <nav className={styles.navigation}>
            <ul className={styles.navigation_list}>
              <li className={classNames(styles.navigation_item, styles.navigation_item_green)}>
                <Link href={'/'} className={styles.navigation_link_green}>Home</Link>
              </li>
              <Image src={arrowRight} alt={'Next Navigation Item'} className={styles.arrow}/>
              <li className={classNames(styles.navigation_item, {
                [styles.navigation_item_green]: searchQuery,
              })}>
                {searchQuery ? <Link href={`/products?category=${searchCategory}`} className={classNames({
                  [styles.navigation_link_green]: searchQuery,
                  [styles.navigation_link_black]: !searchQuery,
                })}>{searchCategoryTitle ? formattedCategories : 'All Categories'}</Link> :
                <h4 className={classNames(styles.navigation_link_black)}>
                  {searchCategoryTitle ? formattedCategories : 'All Categories'}
                </h4>
                }

              </li>
              {searchQuery && <Image src={arrowRight} alt={'Next Navigation Item'} className={styles.arrow}/>}
              {searchQuery &&
                <li className={styles.navigation_item}><h3 className={styles.navigation_link_black}>{searchQuery}</h3>
                </li>}
            </ul>
          </nav>
          <div className={styles.searching_data}>
            <div className={styles.left}>
              <TitleText
                text={searchQuery ? `Showing product for “${searchQuery}”` : `Showing product for “${searchCategoryTitle ? formattedCategories : 'All Categories'}”`}
                size={'md'} isCenter={false}/>
              <SecondaryText
                text={total > 0 ? `Showing ${page === '1' ? 1 : pageStart} - ${page === '1' ? pageSize : pageEnd} Products` : `No Products Found`}
                size={'md'} isCenter={false}/>
            </div>
            <div className={styles.right}>
              <div className={styles.sorting}>
                <SecondaryText className={styles.sorting_text} text={'Sort by:'} size={'md'} isCenter={false}/>
                <ProductsDropdown sortBy={sortBy} allParams={allParams}/>
                <button onClick={(e) => handleMenuOpen(e)} className={classNames(styles.view_box, styles.filtering)}>
                  <Image src={filterIcon} alt={'Open filter menu'}/>
                </button>
              </div>
              <div className={styles.line}></div>
              <div className={styles.view}>
                <Link className={classNames(styles.view_box, {
                  [styles.view_box_active]: view === 'grid',
                })} href={`/products?${new URLSearchParams({...allParams, view: 'grid'})}`}>
                  <Image src={view === 'grid' ? viewGrid : viewGridBlack} alt={'Grid'}/>
                </Link>
                <Link className={classNames(styles.view_box, {
                  [styles.view_box_active]: view === 'line',
                })} href={`/products?${new URLSearchParams({...allParams, view: 'line'})}`}>
                  <Image src={view === 'line' ? viewLineWhite : viewLine} alt={'Line'}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsListTop;