import api from "./createAxios";

const getCategories = async () => {
  const {data} = await api.get('/categories?populate=*');
  return data;
}
export default getCategories;