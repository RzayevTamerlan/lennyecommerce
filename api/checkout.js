import api from "./createAxios";

const getAllBasketProducts = async (products, stripeid, email) => {
  const {data} = await api.post('/orders', {
    "data": {
      email,
      stripeid,
      products
    }
  });
  return data
}
export default getAllBasketProducts;