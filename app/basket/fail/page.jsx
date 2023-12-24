import styles from "./Fail.module.scss";
import TitleText from "../../../components/ui/TitleText/TitleText";
import SecondaryText from "../../../components/ui/SecondaryText/SecondaryText";
import Link from "next/link";

export default async function Fail({searchParams}) {
  return (
    <div className={styles.error_container}>
      <div className={styles.error_circle}>
        <span className={styles.error_exclamation}>!</span>
      </div>
      <TitleText text={'Oops! Something went wrong with your order.'} isCenter={true} size={'md'}/>
      <SecondaryText text={`Try again later. Your order id is: ${searchParams?.session_id}`} isCenter={true} size={'md'}/>
      <Link href={'/'} className={styles.btn}>
        Back to home
      </Link>
    </div>
  )
}