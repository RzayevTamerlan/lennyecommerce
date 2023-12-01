"use client"
import {useEffect, useState} from "react";
import {getPopularProducts} from "../../../api/getPopularProducts";
import styles from "./PopularProductsSection.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import ProductCard from "../../ProductCard/ProductCard";
import EmptyButton from "../../ui/EmptyButton/EmptyButton";
import {getCookie} from "../../../actions/auth";
import {setToken} from "../../../api/createAxios";

const PopularProductsSection = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchPopularProducts = async () => {
      const {data} = await getPopularProducts(page, limit);
      const token = await getCookie();
      if (token !== 'No Cookie Found') {
        await setToken(token.value);
      }
      setProducts(data);
    };

    fetchPopularProducts();
  }, []);
  const handleMore = async () => {
    const {data} = await getPopularProducts(page + 1, limit);
    setProducts([...products, ...data]);
    setPage(page + 1);
  }
  return (
    <section className={styles.section_box}>
      <div className={'container'}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <TitleText text={'Popular Product on Lenny'} size={'lg'} isCenter={true}/>
            <SecondaryText isCenter={true} text={'Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in'}
                           size={'md'}/>
          </div>
          <div className={styles.body}>
            <ul className={styles.product_list}>
              {products.map((product) => {
                return (<li key={product.id} className={styles.product_item}>
                  <ProductCard uniId={product.id} isSlide={false} rating={product.attributes.rating} producer={product.attributes.producer}
                               image={product.attributes.preview.data.attributes.url}
                               price={product.attributes.price}
                               name={product.attributes.title} id={product.id} slug={product.attributes.slug}
                  />
                </li>)
              })}
            </ul>
            {page >= 2 ? null :
              <div className={styles.btn_row}><EmptyButton callback={handleMore} size={'md'} text={'Load More'}
                                                           isLink={false}/></div>}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PopularProductsSection;