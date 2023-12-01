import styles from "./PostsList.module.scss"
import PostCard from "../PostCard/PostCard";

const PostsList = ({posts}) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.id} className={styles.list_item}>
                <PostCard image={post.attributes.preview.data.attributes.url} slug={post.attributes.slug}
                          shortTitle={post.attributes.shortTitle}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PostsList;