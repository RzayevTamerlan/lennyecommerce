import styles from "./Success.module.scss"
import succsessImg from "../../../public/icons/checkout-succsess/tick-circle.svg"
import TitleText from "../../../components/ui/TitleText/TitleText";
import SecondaryText from "../../../components/ui/SecondaryText/SecondaryText";
import Image from "next/image";
import Link from "next/link";
import {getCookie} from "../../../actions/auth";
import deleteProductFromBasket from "../../../api/deleteProductFromBasket";

export default async function Success({searchParams}) {
  const token = await getCookie();
  if (!token?.value) {
    return (
      <div className={styles.wrapper}>
        <TitleText size={'lg'} isCenter={true} text={'Not Authorized.'}/>
      </div>
    )
  } else {
    const productsIds = searchParams.prodcuts;
    const productsIdsArr = productsIds.split(',');
    productsIdsArr.forEach(async (product) => {
      await deleteProductFromBasket(product)
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.img_box}>
        <div className={styles.img_circle}></div>
        <Image attributes={'Succsess'} src={succsessImg}/>
      </div>
      <TitleText text={'Your Payment is Successful!'}/>
      <SecondaryText text={`Your payment ID is ${searchParams?.session_id || 'Error in finding your ID'}`}/>
      <Link href={'/'} className={styles.btn}>
        Back to home
      </Link>
    </div>
  )
}