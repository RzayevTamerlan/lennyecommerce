import {getUser} from "../../actions/auth";
import styles from "./basket.module.scss"
import BasketHead from "../../components/Basket/BasketHead/BasketHead";
import BasketItems from "../../components/Basket/BasketItems/BasketItems";
import BasketSummary from "../../components/Basket/BasketSummary/BasketSummary";
import RelatedProducts from "../../components/ProductPage/RelatedProducts/RelatedProducts";

export default async function Basket() {
  const isUserLoggedIn = await getUser();
  return (
    <section className={styles.wrapper}>
      <BasketHead title={'Shopping Chart'}/>
      <div className="container">
        <div className={styles.inner}>
          <BasketItems isUserLoggedIn={isUserLoggedIn}/>
          <BasketSummary isUserLoggedIn={isUserLoggedIn}/>
        </div>
        <RelatedProducts isBasket={true}/>
      </div>
    </section>
  )
}

