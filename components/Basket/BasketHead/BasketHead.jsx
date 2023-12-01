import styles from "./BasketHead.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";

const BasketHead = ({title}) => {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <TitleText text={title} isCenter={false} size={'md'}/>
        <SecondaryText isCenter={false} size={'md'} text={'Showing your choices product'}/>
      </div>
    </div>
  );
};

export default BasketHead;