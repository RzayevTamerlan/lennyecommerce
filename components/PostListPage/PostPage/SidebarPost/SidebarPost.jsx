'use client'
import Link from "next/link";
import Image from "next/image";
import styles from "./SidebarPost.module.scss"

const SidebarPost = ({image, title, slug}) => {
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${image}`;
  }
  return (
    <Link href={`/posts/${slug}`} className={styles.link}>
      <div className={styles.image_box}>

        <Image width={90} height={64} className={styles.image} src={image} alt={title} loader={myLoader}/>
      </div>
      <h3 className={styles.title}>
        {title}
      </h3>
    </Link>
  );
};

export default SidebarPost;