import styles from './Products.module.scss'
import ProductsListTop from "../../components/ProductsList/ProductsListTop/ProductsListTop";
import getCategories from "../../api/getCategories";
import getFilteredProducts from "../../api/getFilteredProducts";
import ProductsFilter from "../../components/ProductsList/ProductsFilter/ProductsFilter";
import getAllLocations from "../../api/getAllLocations";
import ProductsListComponent from "../../components/ProductsList/ProductsListComponent/ProductsListComponent";
import Overlay from "../../components/Overlay/Overlay";

export const revalidate = 15;
export default async function Products({searchParams}) {
  let {data: categories} = await getCategories();
  const {data: locations} = await getAllLocations();
  const bestFilters = [{
    id: 99,
    attributes: {
      title: '4 stars or upper',
      slug: '4-star-or-upper',
    }
  }]
  const searchCategory = searchParams.category || 'all-categories';
  const page = searchParams.page || 1;
  const view = searchParams.view || 'grid';
  const pageSize = searchParams.pageSize || 12;
  const searchQuery = searchParams.search || '';
  const sortBy = searchParams.sortBy || '-1';
  const location = searchParams.location || '';
  const minPrice = searchParams.minPrice || '';
  const maxPrice = searchParams.maxPrice || '';
  const bestFilter = searchParams.bestfilter || '';
  const searchCategoryTitle = searchParams.category;
  const productsList = await getFilteredProducts(page, pageSize, searchCategory, location, minPrice, maxPrice, sortBy, bestFilter, searchQuery);
  return (
    <main className={styles.main}>
      <Overlay/>
      <ProductsListTop page={page} pageSize={pageSize}
                       searchQuery={searchQuery}
                       total={productsList?.meta?.pagination?.total}
                       sortBy={sortBy}
                       view={view}
                       allParams={searchParams}
                       searchCategory={searchCategory}
                       searchCategoryTitle={searchCategoryTitle}/>
      <div className={styles.products}>
        <div className={'container'}>
          <div className={styles.products_inner}>
            <ProductsFilter allLocations={locations} bestFilters={bestFilters} allSearchParams={searchParams}
                            allCategories={categories}/>
            <ProductsListComponent allParams={searchParams} products={productsList.data} view={view}
                                   pagination={productsList.meta.pagination}/>
          </div>
        </div>
      </div>
    </main>
  )
}
