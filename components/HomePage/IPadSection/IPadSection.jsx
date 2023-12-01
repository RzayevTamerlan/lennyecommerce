import styles from './IPadSection.module.scss'
import Image from "next/image";
import ipad from "../../../public/ipad/ipad.png"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import FilledButton from "../../ui/FilledButton/FilledButton";
import EmptyButton from "../../ui/EmptyButton/EmptyButton";

const IPadSection = () => {
  return (
    <section className={styles.section}>
      <div className={'container'}>
        <div className={styles.inner}>
          <div className={styles.image_box}>
            <Image src={ipad} alt={'Ipad Air Gen 5'} className={styles.image}/>
          </div>
          <div className={styles.content_box}>
            <TitleText text={'Ipad Air Gen 5'} size={'md'} isCenter={false}/>
            <div className={styles.descr}>
              <SecondaryText
                text={'Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in sapien quam risus sed diam.'}
                size={'md'}
                isCenter={false}
              />
            </div>
            <div className={styles.btn_row}>
              <FilledButton href={'#'} text={'Buy $900'}/>
              <EmptyButton isLink={true} size={'md'} text={'View Detail'} link={"/products/apple-ipad-air-10-9"}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IPadSection;