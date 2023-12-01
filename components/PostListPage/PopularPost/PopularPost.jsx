"use client"
import styles from "./PopularPost.module.scss";
import Image from "next/image";
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import Link from "next/link";
import arrowRight from "../../../public/icons/arrow-right/arrow-right.svg"

const PopularPost = ({href, image, title, description}) => {
  if (description.length > 220) {
    description = description.slice(0, 220) + '...'
  }
  const myLoader = ({src}) => {
    return `${process.env.NEXT_PUBLIC_API}${image}`
  }
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.image_box}>
            <Image loader={myLoader} width={542} height={356} src={image} className={styles.image} alt={title}/>
          </div>
          <div className={styles.content_box}>
            <TitleText text={title} isCenter={false} size={'md'}/>
            <div className={styles.description}>
              <SecondaryText size={'sm'} text={description} isCenter={false}/>
            </div>
            <Link href={`/posts/${href}`} className={styles.link}>Read More <Image alt={'Read more'} src={arrowRight}/></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPost;