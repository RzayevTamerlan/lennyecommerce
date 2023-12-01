import api from "./createAxios";

const getPostBySlug = async (slug) => {
  const {data} = await api.get(`/posts?filters[slug][$eq]=${slug}&populate=*`,);
  return data;
}
export default getPostBySlug