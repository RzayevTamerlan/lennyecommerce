import api from "./createAxios";

const deleteProductFromBasket = async (id) => {
  const {data: updatedData} = await api.delete(`/baskets/${id}`);
  return updatedData;
}
export default deleteProductFromBasket;