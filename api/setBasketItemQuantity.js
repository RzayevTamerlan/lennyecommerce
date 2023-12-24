import api from "./createAxios";

const setBasketItemQuantity = async (id, username, quantity) => {
  const {data: updatedData} = await api.put(`/baskets/${id}`, {
    "data": {
      quantity: +quantity
    }
  });
  return updatedData;
}
export default setBasketItemQuantity;