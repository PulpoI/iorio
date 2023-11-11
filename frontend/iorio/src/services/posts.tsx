import { API } from "./apirest";

export const getPostRequest = (id) => {
  fetch(API + `/content/${id}`, {
    method: "GET",
    body: JSON.stringify(id),
  }).then((res) => res.json());
};

export const getPostsUserRequest = (id) =>
  fetch(API + `/content?user_id=${id}`).then((res) => res.json());

export const createtPostsRequest = (post) => {
  fetch(API + "/content", {
    method: "POST",
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const updatePostsRequest = (post) => {
  fetch(API + `/content/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  }).then((res) => res.json());
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
