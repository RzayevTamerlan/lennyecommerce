import api from "./createAxios";

const incrementBasketItem = async (slug, username) => {
  const {data} = await api.get(`/baskets?filters[$and][0][slug][$eq]=${slug}&filters[$and][1][username][$eq]=${username}&populate=*`);
  const productQuantity = data.data[0].attributes.quantity;
  const {data: updatedData} = await api.put(`/baskets/${data.data[0].id}`, {
    "data": {
      "quantity": productQuantity + 1
    }
  });
  return updatedData;
}
export default incrementBasketItem;