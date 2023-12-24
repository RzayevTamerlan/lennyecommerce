import styles from './Product.module.scss'
import getProductBySlug from "../../../api/getProductBySlug";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import arrowRight from "../../../public/icons/arrow-right-gray/arrow-right.svg";
import ProductSlider from "../../../components/ProductPage/ProductSlider/ProductSlider";
import ProductInfo from "../../../components/ProductPage/ProductInfo/ProductInfo";
import ProductNav from "../../../components/ProductPage/ProductNav/ProductNav";
import getAllProducts from "../../../api/getAllProducts";
import ProductSections from "../../../components/ProductPage/ProductSections/ProductSections";
import ProductDetails from "../../../components/ProductPage/ProductDetails/ProductDetails";
import ProductMerchant from "../../../components/ProductPage/ProductMerchant/ProductMerchant";
import ProductLine from "../../../components/ProductPage/ProductLine/ProductLine";
import ProductRatingStats from "../../../components/ProductPage/ProductRatingStats/ProductRatingStats";
import ProductsComments from "../../../components/ProductPage/ProductsComments/ProductsComments";
import getCommentsByProduct from "../../../api/getCommentsByProduct";
import getCommentsByProductNotFiltered from "../../../api/getCommentsByProductNotFiltered";
import RelatedProducts from "../../../components/ProductPage/RelatedProducts/RelatedProducts";
import NotFoundPage from "./not-found";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.data.map((product) => ({
    slug: product.attributes.slug,
  }))
}

export const revalidate = 15;
export default async function Product({searchParams, params: slug}) {
  const search = searchParams?.search;
  const ratingFilter = searchParams?.rating;
  const reviewFilter = searchParams?.review;
  const {data: productData} = await getProductBySlug(slug?.slug);
  if (productData.length === 0) {
    return <NotFoundPage></NotFoundPage>
  }
  const productId = productData[0]?.id;
  const category = productData[0].attributes?.category?.data[0]?.attributes?.title;
  const productName = productData[0]?.attributes?.title;
  const productDescription = productData[0]?.attributes?.description;
  const categorySlug = productData[0]?.attributes?.category?.data[0]?.attributes?.slug;
  const sliders = productData[0]?.attributes?.slider?.data;
  const preview = productData[0]?.attributes?.preview?.data?.attributes?.url;
  const merchant = productData[0]?.attributes?.producer;
  const productSpecs = productData[0]?.attributes?.specs;
  const productLocation = productData[0]?.attributes?.location;
  const {data: comments} = await getCommentsByProduct(productData[0]?.attributes?.slug, ratingFilter, reviewFilter);
  const {data: allProductComments} = await getCommentsByProductNotFiltered(productData[0]?.attributes?.slug);
  return (
    <main className={styles.main}>
      <div className="container">
        <nav className={styles.navigation}>
          <ul className={styles.navigation_list}>
            <li className={styles.navigation_item}>
              <Link className={classNames(styles.navigation_link, styles.navigation_link_green)}
                    href={`/`}>Home</Link>
            </li>
            <Image src={arrowRight} className={styles.arrow_right} alt={'Next Navigation Item'}/>
            <li className={styles.navigation_item}>
              <Link className={classNames(styles.navigation_link, styles.navigation_link_green)}
                    href={`/products?category=${categorySlug}`}>{category}</Link>
            </li>
            <Image src={arrowRight} className={styles.arrow_right} alt={'Next Navigation Item'}/>
            {search && search !== 'undefined' ? (<>
              <li className={styles.navigation_item}>
                <ProductNav className={[styles.navigation_link, styles.navigation_link_green]} text={search}/>
              </li>
              <Image className={styles.arrow_right} src={arrowRight}/>
            </>) : null}
            <li className={styles.navigation_item}>
              <h3 className={styles.navigation_link}>{productName}</h3>
            </li>
          </ul>
        </nav>
        <div className={styles.product}>
          <ProductSlider sliders={sliders}/>
          <ProductInfo productId={productId} allParams={searchParams} merchant={merchant} preview={preview}
                       type={productData[0].attributes.type}
                       slug={slug}
                       types={productData[0].attributes.types} color={productData[0].attributes.color}
                       colors={productData[0].attributes.colors}
                       description={productData[0].attributes.description} title={productData[0].attributes.title}
                       price={productData[0].attributes.price}
                       rating={productData[0].attributes.rating}/>
        </div>
        <div className={styles.product_description}>
          <ProductSections/>
          <ProductDetails name={productName} description={productDescription} specs={productSpecs}/>
          <ProductLine/>
          <ProductMerchant location={productLocation} merchant={merchant}/>
          <ProductLine/>
          <ProductRatingStats coments={allProductComments}/>
          <ProductsComments productId={productId} allSearchParams={searchParams} comments={comments}/>
          <ProductLine/>
          <RelatedProducts/>
        </div>
      </div>
    </main>
  )
}
