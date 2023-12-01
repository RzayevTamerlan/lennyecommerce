'use server';
import getProductBySlug from "../api/getProductBySlug";

export async function getAllProductsWithPrev(products) {
  const finalProducts = [];
  for (let i = 0; i < products.length; i++) {
    const productData = await getProductBySlug(products[i].attributes.slug);
    finalProducts.push(productData.data[0]);
  }
  return finalProducts
}