'use client';
import styles from "./CommentsFilter.module.scss"
import {useCommentsFilter} from "../../../store/store";
import TitleText from "../../ui/TitleText/TitleText";
import ProductsFilterBox from "../../ProductsList/ProductsFilterBox/ProductsFilterBox";
import classNames from "classnames";
import Image from "next/image";
import closeIcon from "../../../public/icons/close/close.svg";

const CommentsFilter = ({comments, allSearchParams}) => {
  const isCommentFilterOpen = useCommentsFilter((state) => state.isCommentFilterOpen);
  const closeFilter = useCommentsFilter((state) => state.IsCommentFilterClose)
  const ratingList = [
    {
      id: 0, attributes: {
        title: '5',
        slug: '5',
      }
    },
    {
      id: 1, attributes: {
        title: '4',
        slug: '4'
      }
    },
    {
      id: 2, attributes: {
        title: '3',
        slug: '3'
      }
    },
    {
      id: 3, attributes: {
        title: '2',
        slug: '2'
      }
    },
    {
      id: 4, attributes: {
        title: '1',
        slug: '1'
      }
    }
  ]
  const reviewList = [
    {
      id: 0, attributes: {
        title: 'Product Quality',
        slug: 'product-quality',
      }
    },
    {
      id: 1, attributes: {
        title: 'Seller Services',
        slug: 'seller-services'
      }
    },
    {
      id: 2, attributes: {
        title: 'Product Price',
        slug: 'product-price'
      }
    },
    {
      id: 3, attributes: {
        title: 'Shipment',
        slug: 'shipment'
      }
    },
    {
      id: 4, attributes: {
        title: 'Match with Description',
        slug: 'match-with-Description'
      }
    }
  ];
  const handleFilterClose = (e) => {
    e.preventDefault();
    closeFilter();
  }
  return (
    <aside className={classNames(styles.aside, {
      [styles.aside_open]: isCommentFilterOpen
    })}>
      <div className={styles.inner}>
        <TitleText text={'Reviews Filter'} size={'sm'} isCenter={false}/>
        <ProductsFilterBox type={'rating'} list={ratingList} isComment={true}
                           allSearchParams={allSearchParams} title={'Rating'}/>
        <ProductsFilterBox type={'review'} list={reviewList} isComment={true}
                           allSearchParams={allSearchParams} title={'Review Topics'}/>
      </div>
      <button onClick={(e) => handleFilterClose(e)} className={styles.close_btn}>
        <Image className={styles.close_img} src={closeIcon} alt={'Close'}/>
      </button>
    </aside>
  );
};

export default CommentsFilter;