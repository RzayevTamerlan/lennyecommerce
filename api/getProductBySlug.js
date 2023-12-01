import api from "./createAxios";

const getProductBySlug = async (slug) => {
  try {
    const {data} = await api.get(`/products?filters[slug][$eq]=${slug}&populate=*`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default getProductBySlug;