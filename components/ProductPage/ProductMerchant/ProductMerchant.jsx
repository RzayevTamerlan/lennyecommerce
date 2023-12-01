import styles from "./ProductMerchant.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import Image from "next/image";
import merchantIcon from "../../../public/icons/product/merchant-logo.png";
import shopIcon from "../../../public/icons/product/shop.svg";
import chatIcon from "../../../public/icons/product/message.svg";

const ProductMerchant = ({merchant, location}) => {
  return (
    <section id={'merchant'} className={styles.wrapper}>
      <TitleText text={'Merchant Information'} isCenter={false} size={'sm'}/>
      <div className={styles.merchant_info}>
        <div className={styles.merchant_data}>
          <Image className={styles.merchant_logo} alt={'Merchant'} src={merchantIcon}/>
          <div className={styles.merchant}>
            <TitleText text={merchant} size={'sm'} isCenter={false}/>
            <SecondaryText text={location} size={'sm'} isCenter={false}/>
            <div className={styles.merchant_tags}>
              <div className={styles.merchant_tag}>Top Rated Merchant</div>
              <div className={styles.merchant_tag}>Best Merchant</div>
            </div>
          </div>
        </div>
        <div className={styles.merchant_btns}>
          <button className={styles.merchant_btn}>
            <Image className={styles.merchant_btn_icon} alt={'Chat with merchant'} src={chatIcon}/>
            Chat
          </button>
          <button className={styles.merchant_btn}>
            <Image className={styles.merchant_btn_icon} alt={'Visit Merchant'} src={shopIcon}/>
            Visit Merchant
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductMerchant