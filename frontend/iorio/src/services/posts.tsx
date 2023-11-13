import { API } from "./apirest";

export const getPostRequest = async (id) => {
  try {
    const response = await fetch(API + `/content?id=${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getPostsUserRequest = (id) =>
  fetch(API + `/content?user_id=${id}`).then((res) => res.json());

export const createtPostsRequest = (post) => {
  fetch(API + "/content", {
    method: "POST",
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const updatePostsRequest = async (post) => {
  try {
    await fetch(API + `/content`, {
      method: "PUT",
      body: JSON.stringify(post),
    }).then((res) => console.log(res));
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const deletePostsRequest = (id, userId, token) => {
  const data = {
    id: id,
    token: token,
    usuario_id: userId,
  };
  fetch(API + `/content`, {
    method: "DELETE",
    body: JSON.stringify(data),
  }).then((res) => {
    return res;
  });
};
// fetch(API + `/content/${id}`, {
//   method: "DELETE",
//   body: JSON.stringify(id, userId, token),
// }).then((res) => res.json());
