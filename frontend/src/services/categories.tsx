import { API } from "./apirest";

export const getCategoriesRequest = async () => {
  try {
    const response = await fetch(API + "/categories", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
