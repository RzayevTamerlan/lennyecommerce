import api from "./createAxios";

const getPopularPosts = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}posts?filters[isPopular][$eq]=true&populate=*`, {
    next: {revalidate: 60},
  });
  const {data: jsonData} = await data.json();
  return jsonData;
}
export default getPopularPosts;