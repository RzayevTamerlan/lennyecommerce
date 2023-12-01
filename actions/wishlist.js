"use server";

import api from "../api/createAxios";

export async function addToWishlist(id, wishlist) {
  try {
    const {data} = await api.put(`/wishlists/${wishlist}`, {
      "data": {
        "products": {
          "connect": [
            {"id": id},
          ]
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    })
    return await data;
  } catch (e) {
    return 'Error';
  }
}

export async function removeFromWishlist(id, wishlist) {
  try {
    const {data} = await api.put(`/wishlists/${wishlist}`, {
      "data": {
        "products": {
          "disconnect": [
            {"id": id},
          ]
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    })
    return await data;
  } catch (e) {
    return 'Error';
  }
}

export async function getWishlist(wishlist) {
  try {
    const {data} = await api.get(`/wishlists/${wishlist}?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    });
    return data;
  } catch (e) {
    return 'Error';
  }
}

export async function findInWishlist(id, wishlist) {
  try {
    const {data} = await api.get(`/wishlists/${wishlist}?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    });
    const products = await data.data.attributes.products.data;
    const found = products.find(product => product.id === id);
    return !!found;
  } catch (e) {
    return 'Error'
  }

}