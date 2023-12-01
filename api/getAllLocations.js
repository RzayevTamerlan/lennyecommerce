import api from "./createAxios";

const getAllLocations = async () => {
  const {data} = await api.get('/locations?populate=*');
  return data;
}
export default getAllLocations;