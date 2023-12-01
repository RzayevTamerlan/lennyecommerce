import api from "./createAxios";

const getPosts = async () => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}posts?populate=*`, {next: {revalidate: 60}});
    const {data: dataJson} = await data.json();
    return dataJson
  } catch (e) {
    console.log(e)
  }

}
export default getPosts;