import api from "./createAxios";

const getAllBasketProducts = async (username) => {
  const {data} = await api.get(`/baskets?filters[username][$eq]=${username}&populate=*`);
  return data;
}
export default getAllBasketProducts;