'use client';
import {useEffect, useState} from "react";
import styles from "./RelatedProducts.module.scss";
import TitleText from "../../ui/TitleText/TitleText";
import EmptyButton from "../../ui/EmptyButton/EmptyButton";
import ProductCard from "../../ProductCard/ProductCard";
import classNames from "classnames";

const RelatedProducts = ({isBasket = false}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function generateRandomNumber() {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * (43 - 2 + 1)) + 2;
      } while (randomNumber === 40);
      return +randomNumber;
    }

    (async () => {
      const allProducts = [];
      const {data: product1} = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products/${generateRandomNumber()}?populate=* `).then(res => res.json());
      allProducts.push(product1);
      const {data: product2} = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products/${generateRandomNumber()}?populate=* `).then(res => res.json());
      allProducts.push(product2);
      const {data: product3} = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products/${generateRandomNumber()}?populate=* `).then(res => res.json());
      allProducts.push(product3);
      const {data: product4} = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products/${generateRandomNumber()}?populate=* `).then(res => res.json());
      allProducts.push(product4);
      setProducts(() => allProducts);
      setLoading(false);
    })();
  }, []);
  return (
    <section className={classNames(styles.wrapper, {
      [styles.basket]: isBasket
    })} id={'product'}>
      <div className={styles.header}>
        <TitleText text={'Related Product'} isCenter={false} size={'md'}/>
        <EmptyButton text={'View Detail'} link={'/products'} isLink={true} size={'sm'}/>
      </div>
      <ul className={styles.products}>
        {loading && <h3 className={styles.loading}>Loading...</h3>}
        {!loading && products.map((product) => (
          <li key={product?.id} className={styles.item}>
            <ProductCard uniId={product.id} wish={false} price={product.attributes.price} isSlide={false}
                         producer={product.attributes.producer}
                         rating={product.attributes.rating}
                         slug={`${product.attributes.slug}`}
                         image={product.attributes.preview.data.attributes.url} name={product.attributes.title}/>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedProducts;