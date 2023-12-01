'use server';
import api from "../api/createAxios";
import {revalidatePath} from "next/cache";

export async function addComment(formData, rating, type, username, product) {
  function slugify(inputString) {
    return inputString
      .toLowerCase() // Преобразуем все символы в нижний регистр
      .replace(/[^\w\s-]/g, '') // Убираем все символы, кроме букв, цифр, пробелов, и дефисов
      .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
      .replace(/--+/g, '-') // Убираем двойные дефисы
      .trim(); // Убираем пробелы в начале и конце строки
  }

  const createComment = await api.post(`/coments`, {
    "data": {
      "description": formData.get('comment'),
      'commentype': type,
      'commenttypeslug': slugify(type),
      "username": username,
      "rating": rating,
    }
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    }
  });
  const newCommentID = await createComment.data.data.id;
  console.log(newCommentID, 'Comment ID');
  console.log(product, "PRODUCT ID")
  const connectNewCommentToProduct = await api.put(`/coments/${newCommentID}`, {
      "data": {
        "product": {
          "connect": [
            {"id": product}
          ]
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    }
  );
  revalidatePath(`${process.env.NEXT_PUBLIC_API}/products`);
}
