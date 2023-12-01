import styles from "./Wishlist.module.scss"
import {getAllUserData} from "../../actions/auth";
import {setToken} from "../../api/createAxios";
import {cookies} from "next/headers";
import {getWishlist} from "../../actions/wishlist";
import ProductCard from "../../components/ProductCard/ProductCard";
import {getAllProductsWithPrev} from "../../actions/getAllProductsWithPrev";
import TitleText from "../../components/ui/TitleText/TitleText";

export const revalidate = 15;
export default async function Wishlist() {
  const token = await cookies().get('AccessToken');
  if (!token?.value) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.empty}>
            <TitleText text={'You have to be logged in to see your wishlist.'} size={'lg'} isCenter={true}/>
          </div>
        </div>
      </main>
    )
  } else {
    await setToken(token.value)
    const user = await getAllUserData();
    const wishlist = await getWishlist(user.wishlist.id);
    const wishlistProducts = wishlist.data.attributes.products.data;
    const productsList = await getAllProductsWithPrev(wishlistProducts);
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.inner}>
            <ul className={styles.products_list}>
              {productsList.map((product) => (
                <li key={product.id}>
                  <ProductCard wish={true} isSlide={false} image={product.attributes.preview.data.attributes.url}
                               producer={product.attributes.producer} price={product.attributes.price}
                               rating={product.attributes.rating} uniId={product.id} name={product.attributes.title}
                               slug={product.attributes.slug}/>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    )
  }
}
