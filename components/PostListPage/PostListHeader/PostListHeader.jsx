import styles from "./PostListHeader.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";

const PostListHeader = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <TitleText text={'The Lenny Blog'} isCenter={true} size={'lg'}/>
          <SecondaryText isCenter={true} size={'md'}
                         text={'All things recruiting: real stories, best practices'}></SecondaryText>
        </div>
      </div>
    </section>
  );
};

export default PostListHeader;