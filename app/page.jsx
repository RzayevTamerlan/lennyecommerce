import styles from './page.module.scss'
import Slider from "../components/Slider/Slider";
import getProductByID from "../api/getProductByID";
import CategorySection from "../components/HomePage/CategorySection/CategorySection";
import getCategories from "../api/getCategories";
import PopularProductsSection from "../components/HomePage/PopularProductsSection/PopularProductsSection";
import IPadSection from "../components/HomePage/IPadSection/IPadSection";
import PostsSection from "../components/HomePage/PostsSection/PostsSection";
import getPopularPostsForHome from "../api/getPopularPostsForHome";
import {ToastContainer} from "react-toastify";
import getAllProducts from "../api/getAllProducts";

// export const revalidate = 15;
export const dynamic = "force-static";
export const revalidate = 15;
export default async function Home() {
  const slideProduct = await getProductByID(36);
  const postsList = await getPopularPostsForHome();
  const {data} = await getCategories();
  return (
    <main className={styles.main}>
      <Slider data={slideProduct}/>
      <CategorySection categories={data}/>
      <PopularProductsSection/>
      <IPadSection/>
      <PostsSection data={postsList}/>
    </main>
  )
}
