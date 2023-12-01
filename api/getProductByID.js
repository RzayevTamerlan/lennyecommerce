import api from "./createAxios";

const getProductByID = async (id) => {
  try {
    const {data} = await api.get(`/products/${id}?populate=*`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default getProductByID;