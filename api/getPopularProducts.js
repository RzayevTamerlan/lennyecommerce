import api from "./createAxios";

export const getPopularProducts = async (page = 1, limit = 8) => {
  const {data} = await api.get(`/products?filters[isPopular][$eq]=true&populate=*&pagination[page]=${page}&pagination[pageSize]=${limit}`, {});
  return data;
}