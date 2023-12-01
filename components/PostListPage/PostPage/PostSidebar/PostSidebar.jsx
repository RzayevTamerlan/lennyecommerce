import styles from "./PostSidebar.module.scss"
import TitleText from "../../../ui/TitleText/TitleText";
import SidebarPost from "../SidebarPost/SidebarPost";
import Link from "next/link";
import Image from "next/image";
import Facebook from "../../../../public/icons/socials/Facebook.svg"
import Instagram from "../../../../public/icons/socials/Instagram.svg"
import Twitter from "../../../../public/icons/socials/Twitter.svg";
import WhatsApp from "../../../../public/icons/socials/Whatsapp.svg";

const PostSidebar = ({posts}) => {
  return (
    <aside className={styles.aside}>
      <TitleText text={'Related Article'} size={'sm'} isCenter={false}/>

      <ul className={styles.post_list}>
        {posts.map(post => (
          <li className={styles.post} key={post.id}>
            <SidebarPost image={post.attributes.preview.data.attributes.url} title={post.attributes.shortTitle}
                         slug={post.attributes.slug}/>
          </li>
        ))}
      </ul>
      <div className={styles.line}></div>
      <div className={styles.aside_footer}>
        <span className={styles.share}>Share to :</span>
        <div className={styles.socials_box}>
          <Link href={'https://facebook.com'} className={styles.socials_link}>
            <Image src={Facebook} alt={'Facebook'}/>
          </Link>
          <Link href={'https://instagram.com'} className={styles.socials_link}>
            <Image src={Instagram} alt={'Instagram'}/>
          </Link>
          <Link href={'https://twitter.com'} className={styles.socials_link}>
            <Image src={Twitter} alt={'Twitter'}/>
          </Link>
          <Link href={'https://whatsapp.com'} className={styles.socials_link}>
            <Image src={WhatsApp} alt={'Whatsapp'}/>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default PostSidebar;