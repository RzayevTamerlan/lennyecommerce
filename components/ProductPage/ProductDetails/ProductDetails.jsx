import styles from "./ProductDetails.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import classNames from "classnames";
import tick from "../../../public/icons/product/tick-circle.svg";
import Image from "next/image";

const ProductDetails = ({name, description, specs}) => {
  return (
    <section id={'detail'} className={styles.wrapper}>
      <div className={styles.title_box}>
        <TitleText text={name} isCenter={false} size={'md'}/>
        <SecondaryText text={description} size={'sm'} isCenter={false}/>
      </div>
      <div className={styles.specs_box}>
        <div className={styles.specs}>
          <TitleText text={'Specification'} isCenter={false} size={'sm'}/>
          <ul className={styles.specs_list}>
            {specs.map((spec, index) => (
              <li key={index} className={classNames(styles.specs_item, {
                [styles.specs_item_odd]: index % 2 === 0
              })}>
                <div className={styles.specs_label}>
                  <SecondaryText text={spec.label} size={'sm'} isCenter={false}/>
                </div>
                <div className={styles.specs_value}>
                  <h3 className={styles.specs_value_label}>
                    {spec.value}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.box}>
          <TitleText text={'In The Box'} size={'sm'} isCenter={false}/>
          <ul className={styles.box_list}>
            <li className={styles.box_item}>
              <Image className={styles.box_image} alt={'Tick'} src={tick}/>
              <h3 className={styles.box_label}>
                UG502 X LIGHTSPEED Wireless Gaming Mouse
              </h3>
            </li>
            <li className={styles.box_item}>
              <Image className={styles.box_image} alt={'Tick'} src={tick}/>
              <h3 className={styles.box_label}>
                DPI-Shift button cover
              </h3>
            </li>
            <li className={styles.box_item}>
              <Image className={styles.box_image} alt={'Tick'} src={tick}/>
              <h3 className={styles.box_label}>
                USB-C charging cable
              </h3>
            </li>
            <li className={styles.box_item}>
              <Image className={styles.box_image} alt={'Tick'} src={tick}/>
              <h3 className={styles.box_label}>
                LIGHTSPEED USB-A receiver
              </h3>
            </li>
            <li className={styles.box_item}>
              <Image className={styles.box_image} alt={'Tick'} src={tick}/>
              <h3 className={styles.box_label}>
                USB extension cable
              </h3>
            </li>
            <li className={styles.box_item}>
              <Image className={styles.box_image} alt={'Tick'} src={tick}/>
              <h3 className={styles.box_label}>
                User Documentation
              </h3>
            </li>
          </ul>
        </div>
        <div className={styles.required}>
          <TitleText text={'System Requirements'} size={'sm'} isCenter={false}/>
          <ul className={styles.required_list}>
            <li className={styles.required_item}>
              - USB port
            </li>
            <li className={styles.required_item}>
              - Internet access for optional software download
            </li>
            <li className={styles.required_item}>
              - Windows® 10 or later
            </li>
            <li className={styles.required_item}>
              - macOS 10.14 or later
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;