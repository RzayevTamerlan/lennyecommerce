import styles from './CategorySection.module.scss';
import TitleText from "../../ui/TitleText/TitleText";
import EmptyButton from "../../ui/EmptyButton/EmptyButton";
import Category from "../../ui/Category/Category";

const CategorySection = ({categories}) => {
  return (
    <section className={styles.wrapper}>
      <div className={'container'}>
        <div className={styles.header_row}>
          <TitleText text={'Featured Category'} isCenter={false} size={'lg'}/>
          <EmptyButton size={'sm'} text={'View Detail'} isLink={true} link={'/products/'}/>
        </div>
        <ul className={styles.categories}>
          {categories.map((category) => {
            return (
              <Category url={`/products?category=${category.attributes.slug}`} title={category.attributes.title} icon={category.attributes.icon.data.attributes}
                        key={category.id}></Category>
            )
          })}
          {categories.map((category, index) => {
            return (
              <Category url={'#'} title={category.attributes.title} icon={category.attributes.icon.data.attributes}
                        key={index}></Category>
            )
          })}
        </ul>
      </div>
    </section>
  );
};

export default CategorySection;