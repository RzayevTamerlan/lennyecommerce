import api from "./createAxios";

const setBasketItemQuantity = async (slug, username, quantity) => {
  const {data} = await api.get(`/baskets?filters[$and][0][slug][$eq]=${slug}&filters[$and][1][username][$eq]=${username}&populate=*`);
  const {data: updatedData} = await api.put(`/baskets/${data.data[0].id}`, {
    "data": {
      quantity
    }
  });
  return updatedData;
}
export default setBasketItemQuantity;