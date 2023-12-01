import api from "./createAxios";

const getCommentsByProduct = async (product, rating, review) => {
  let ratingMin = 0;
  console.log("RATING", rating);
  console.log("RATINGMIN", ratingMin);
  if (rating?.includes(',')) {
    const ratingArray = rating.split(',');
    const ratingNumArray = ratingArray.map(rate => rate * 1);
    ratingMin = Math.min(...ratingNumArray);
  } else {
    ratingMin = +rating;
  }
  let requestString = `/coments?&filters[$and][0][product][slug][$eq]=${product}`;
  let filterCount = 1;
  if (rating) {
    requestString += `&filters[$and][${filterCount}][rating][$gte]=${ratingMin}`;
    filterCount += 1;
  }
  if (review) {
    requestString += `&filters[$or][${filterCount}][commenttypeslug][$in]=${review}`;
    filterCount += 1;
  }
  requestString += `&populate=*`;
  console.log(requestString, 'Request String');
  const {data} = await api.get(requestString);
  return data;
}
export default getCommentsByProduct;