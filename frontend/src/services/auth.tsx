import { API } from "./apirest";

export const registerRequest = (user: object) =>
  fetch(API + "/users", {
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const loginRequest = (user: object) =>
  fetch(API + "/auth", {
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const verifyTokenRequest = (token: string) =>
  fetch(API + "/verify-token", {
    method: "POST",
    body: JSON.stringify({ token }),
  }).then((res) => res.json());

export const updateToken = (token: string) =>
  fetch(API + "/verify-token", {
    method: "PUT",
    body: JSON.stringify({ token }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
