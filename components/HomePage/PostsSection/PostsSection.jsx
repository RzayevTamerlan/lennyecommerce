import styles from "./PostsSection.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import EmptyButton from "../../ui/EmptyButton/EmptyButton";
import Post from "../../Post/Post";

const PostsSection = ({data}) => {
  return (
    <section className={styles.section}>
      <div className={'container'}>
        <div className={styles.header}>
          <TitleText text={'Lenny’s Article'} size={'lg'} isCenter={false}/>
          <EmptyButton text={'View Detail'} size={'sm'} isLink={true} link={'/posts'}/>
        </div>
        <ul className={styles.posts_list}>
          {data.data.map((post) => (
            <li className={styles.post} key={data.id}>
              <Post img={post.attributes.preview.data.attributes.url} href={post.attributes.slug}
                    description={post.attributes.shortDescription} title={post.attributes.shortTitle}
                    date={post.attributes.updatedAt}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PostsSection;