'use client'
import styles from "./PostCard.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import Image from "next/image";
import Link from "next/link";
import rightArrow from "../../../public/icons/arrow-right/arrow-right.svg"

const PostCard = ({image, shortTitle, slug}) => {
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${image}`
  }
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.image_box}>
          <Image alt={shortTitle} loader={myLoader} className={styles.image} src={image} width={384} height={260}/>
        </div>
        <div className={styles.content_box}>
          <div className={styles.about_post}>
            <div className={styles.tag}>Lenny Article</div>
            <p className={styles.time}>6 Min Read</p>
          </div>
          <TitleText text={shortTitle} isCenter={false} size={'sm'}/>
          <Link href={`/posts/${slug}`} className={styles.link}>Read More <Image alt={"Read more"}
                                                                                 src={rightArrow}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;