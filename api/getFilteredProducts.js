import api, {setToken} from "./createAxios";
import {getCookie} from "../actions/auth";

const getFilteredProducts = async (page = 1, size = 12, category = 'Electronics', location, minPrice, maxPrice, sortValue, bestFilter, searchQuery) => {
  try {
    let requestString = `products?populate=*&pagination[page]=${page}&pagination[pageSize]=${size}&sort=price:${sortValue > 0 ? 'ASC' : 'DESC'}`;
    let filterCount = 0;
    if (bestFilter === '4-star-or-upper') {
      const {data} = await api.get(`products?populate=*&pagination[page]=${page}&pagination[pageSize]=${size}&filters[$and][0][rating][$gte]=5`);
      return data;
    }
    if (minPrice) {
      requestString += `&filters[$and][${filterCount}][price][$gte]=${minPrice}`;
      filterCount++;
    }
    if (maxPrice) {
      requestString += `&filters[$and][${filterCount}][price][$lte]=${maxPrice}`;
      filterCount++;
    }
    if (category) {
      if (category === 'all-categories') {
      } else {
        const categoryArray = category.split(',');
        if (categoryArray.includes('all-categories')) {
          categoryArray.splice(categoryArray.indexOf('all-categories'), 1);
        }
        categoryArray.forEach((category) => {
          requestString += `&filters[$or][${filterCount}][category][slug][$in]=${category}`;
          filterCount += 1;
        })
      }
    }
    if (location) {
      const locationArray = location.split(',');
      const formattedLocations = locationArray.map((loc) => {
        return loc[0].toUpperCase() + loc.slice(1);
      })
      formattedLocations.forEach((loc) => {
        requestString += `&filters[$or][${filterCount}][location][$in]=${loc}`;
        filterCount += 1;
      })
    }
    if (searchQuery === '' || searchQuery === undefined || searchQuery) {
      if (searchQuery) {
        requestString += `&[_q]=${searchQuery}`;
        filterCount++;
      } else {
        requestString += `&[_q]=`;
        filterCount++;
      }
    }
    // console.log(requestString);
    const {data} = await api.get(requestString);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export default getFilteredProducts;