'use server';
import {cookies} from "next/headers";
import api, {removeToken} from "../api/createAxios";

export async function loginUser(identifier, password) {
  try {
    const {data} = await api.post(`/auth/local`, {
      identifier,
      password,
    })
    const sixM = 6 * 60000000000;
    cookies().set({
      name: 'AccessToken',
      value: data.jwt,
      httpOnly: true,
      path: '/',
      expires: new Date().getTime() + sixM,
    });
    return await data;
  } catch (e) {
    return 'Error';
  }
}

export async function registerUser(username, email, password) {
  try {
    const {data} = await api.post(`/auth/local/register`, {
      username,
      email,
      password,
    });
    const sixM = 241920000;
    cookies().set({
      name: 'AccessToken',
      value: data.jwt,
      httpOnly: true,
      path: '/',
      expires: new Date().getTime() + sixM,
    });
    const {data: newBasket} = await api.post('/baskets', {
      "data": {
        "title": "Hello"
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    });
    const newBasketId = newBasket.data.id
    const connectNewBasketToUser = await api.put(`/baskets/${newBasketId}`, {
      "data": {
        "users_permissions_user": {
          "set": [
            {"id": data.user.id}
          ]
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    })
    const {data: newWishlist} = await api.post('/wishlists', {
      "data": {
        "title": "Hello"
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    });
    const newWishlistId = newWishlist.data.id;
    const connectNewWishlistToUser = await api.put(`/wishlists/${newWishlistId}`, {
      "data": {
        "users_permissions_user": {
          "set": [
            {"id": data.user.id}
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

export async function getCookie() {
  if (cookies().has('AccessToken')) {
    const encrypted = await cookies().get('AccessToken');
    return encrypted;
  } else {
    return 'No Cookie Found';
  }
}

export async function logoutUser() {
  try {
    cookies().set({
      name: 'AccessToken',
      value: '',
      httpOnly: true,
      path: '/',
      expires: new Date().getTime() - 1,
    });
    removeToken();
    return 'Logged Out';
  } catch (e) {
    return 'Error';
  }
}

export async function getUser() {
  try {
    const {data} = await api.get(`/users/me`);
    return data;
  } catch (e) {
    return 'Error';
  }
}
export async function getAllUserData() {
  try {
    const {data} = await api.get('/users/me?populate=*');
    return data
  } catch(e) {
    return 'Error'
  }
}