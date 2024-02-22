import { baseUrl } from "./constants";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const api = async (method, endpoint, token = "", body = null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
  const requestOptions = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  };
  const res = await fetch(`${baseUrl}${endpoint}`, requestOptions);
  return processServerResponse(res);
};

// export const getClothingItems = async () => {
//   const res = await fetch(`${baseUrl}/items`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });
//   return processServerResponse(res);
// };

// export const addLike = (itemId, token) => {
//   return api("PUT", `/items/${itemId}/likes`, token);
// };
// export const removeLike = (itemId, token) => {
//   return api("DELETE", `/items/${itemId}/likes`, token);
// };
// changed from data to item ? changed from item_.id
