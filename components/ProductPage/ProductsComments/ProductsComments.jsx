import styles from "./ProductsComments.module.scss"
import CommentsFilter from "../CommentsFilter/CommentsFilter";
import Comments from "../Comments/Comments";
import {getCookie, getUser} from "../../../actions/auth";

const ProductsComments = async ({comments, allSearchParams, productId}) => {
  const token = await getCookie();
  const userData = await getUser(token?.value);
  return (
    <section className={styles.wrapper}>
      <CommentsFilter comments={comments} allSearchParams={allSearchParams}/>
      <Comments product={productId} userData={userData} comments={comments}/>
    </section>
  );
};

export default ProductsComments;