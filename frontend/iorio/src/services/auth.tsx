const API = "http://localhost/Proyectos/16%20-%20Iorio/backend/";

export const registerRequest = (user: object) =>
  fetch(API + "users", {
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const loginRequest = (user: object) =>
  fetch(API + "auth", {
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());
