import api from "./createAxios";

const getAllBasketProducts = async (title, slug, preview, color, type, price, merchant, username, quantity) => {
  const {data} = await api.post(`/baskets`, {
    "data": {
      title,
      slug,
      preview,
      color,
      type,
      price,
      merchant,
      quantity: quantity || 1,
      username
    }
  });
  return data;
}
export default getAllBasketProducts;