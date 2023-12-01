import api from "./createAxios";

const getAllProducts = async () => {
  const {data} = await api.get('/products?populate=*&pagination[pageSize]=100');
  return data;
}
export default getAllProducts;