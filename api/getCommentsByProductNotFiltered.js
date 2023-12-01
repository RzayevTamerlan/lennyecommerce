import api from "./createAxios";

const getCommentsByProductNotFiltered = async (product) => {
  try {
    const {data} = await api.get(`/coments?&filters[$and][0][product][slug][$eq]=${product}&populate=*`);
    return data
  }catch(e) {
    return 'Error';
  }
}

export default getCommentsByProductNotFiltered;