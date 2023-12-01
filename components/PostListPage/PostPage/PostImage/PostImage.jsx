'use client'
import styles from "./PostImage.module.scss";
import Image from "next/image";

const PostImage = ({image, title}) => {
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${image}`
  }
  return (
    <div className={'container'}>
      <Image className={styles.image} width={1200} height={500} loader={myLoader} src={image} alt={title}/>
    </div>
  );
};

export default PostImage;