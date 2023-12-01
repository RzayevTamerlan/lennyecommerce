'use client';
import Link from "next/link";
import Image from "next/image";
import styles from "./Post.module.scss"
import TitleText from "../ui/TitleText/TitleText";
import SecondaryText from "../ui/SecondaryText/SecondaryText";

const Post = ({href, title, description, date, img}) => {
  console.log(description)
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${img}`
  }
  const dateObject = new Date(date);
  const options = {year: 'numeric', month: 'short', day: 'numeric'};
  const formattedDate = dateObject.toLocaleDateString('en-GB', options);
  return (
    <Link className={styles.wrapper} href={`/posts/${href}`}>
      <div className={styles.img_box}>
        <Image width={384} height={280} src={img} alt={title} loader={myLoader}></Image>
      </div>
      <div className={styles.content}>
        <span className={styles.date}>{formattedDate}</span>
        <TitleText size={'sm'} text={title} isCenter={false}/>
        <div className={styles.description}>
          <SecondaryText text={description} size={'sm'} isCenter={false}/>
        </div>
      </div>
    </Link>
  );
};

export default Post;