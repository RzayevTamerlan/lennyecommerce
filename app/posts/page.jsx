import styles from "./posts.module.scss";
import getPopularPost from "../../api/getPopularPost";
import getPosts from "../../api/getPosts";
import PostListHeader from "../../components/PostListPage/PostListHeader/PostListHeader";
import PopularPost from "../../components/PostListPage/PopularPost/PopularPost";
import PostsList from "../../components/PostListPage/PostsList/PostsList";
export const dynamic = "force-static";
export default async function Posts() {
  const data = await getPopularPost();
  const posts = await getPosts();
  console.log("In Posts page");
  return (
    <main className={styles.main}>
      <PostListHeader/>
      <PopularPost href={data[0].attributes.slug} image={data[0].attributes.image.data.attributes.url}
                   title={data[0].attributes.title}
                   description={data[0].attributes.description}/>
      <PostsList posts={posts}/>
    </main>
  )
}
