"use client"
import styles from "./Category.module.scss";
import Link from "next/link";
import Image from "next/image";
import TitleText from "../TitleText/TitleText";
import SecondaryText from "../SecondaryText/SecondaryText";

const Category = ({icon, title, url}) => {
    const myLoader = ({src}) => {
      return `${process.env.NEXT_PUBLIC_API}${icon.url}`
    }
    return (
      <Link href={url} className={styles.category_box}>
        <div className={styles.icon_box}>
          <Image className={styles.icon} width={icon.width} height={icon.height} loader={myLoader} alt={title}
                 src={`${process.env.NEXT_PUBLIC_API}${icon.url}`}/>
        </div>
        <div className={styles.content}>
          <TitleText text={title} size={'sm'} isCenter={true}/>
          <SecondaryText className={styles.nowrap} text={'8.9k products'} size={'sm'}/>
        </div>
      </Link>
    );
  }
;

export default Category;