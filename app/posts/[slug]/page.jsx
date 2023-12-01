import getPostBySlug from "../../../api/getPostBySlug";
import NavigationBar from "../../../components/PostListPage/PostPage/NavigationBar/NavigationBar";
import styles from "./post.module.scss"
import PostImage from "../../../components/PostListPage/PostPage/PostImage/PostImage";
import getPosts from "../../../api/getPosts";
import PostSidebar from "../../../components/PostListPage/PostPage/PostSidebar/PostSidebar";
import TitleText from "../../../components/ui/TitleText/TitleText";

export const revalidate = 15;
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.attributes.slug,
  }))
}

export default async function Post({params: slug}) {
  const {data} = await getPostBySlug(slug.slug);
  const posts = await getPosts();
  console.log(data)
  return (
    <main className={styles.main}>
      <NavigationBar/>
      <PostImage title={data[0]?.attributes?.title} image={data[0]?.attributes?.image?.data?.attributes?.url}/>
      <div className={styles.content}>
        <div className="container">
          <div className={styles.inner}>
            <PostSidebar posts={posts}/>
            <div className={styles.content_text}>
              <TitleText text={data[0]?.attributes?.title} isCenter={false} size={'md'}/>
              <h3 className={styles.description}>
                {data[0]?.attributes?.description}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}