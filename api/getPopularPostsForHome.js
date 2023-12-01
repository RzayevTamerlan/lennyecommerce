import api from "./createAxios";

const getPopularProducts = async () => {
  const {data} = await api.get(`/posts?populate=*&pagination[page]=1&pagination[pageSize]=3`,);
  return data;
}

export default getPopularProducts;