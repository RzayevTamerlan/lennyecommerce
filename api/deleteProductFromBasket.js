import api from "./createAxios";

const deleteProductFromBasket = async (slug, username) => {
  const {data} = await api.get(`/baskets?filters[$and][0][slug][$eq]=${slug}&filters[$and][1][username][$eq]=${username}&populate=*`);
  const {data: updatedData} = await api.delete(`/baskets/${data.data[0].id}`);
  return updatedData;
}
export default deleteProductFromBasket;