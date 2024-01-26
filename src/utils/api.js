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

  const res = await fetch(`${baseUrl}/${endpoint}`, requestOptions);
  return processServerResponse(res);
};

export const getClothingItems = async () => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return processServerResponse(res);
};

export const addClothingItem = async (newItem) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.imageUrl,
    }),
  });
  return processServerResponse(res);
};

export const deleteClothingItems = async (_id) => {
  const res = await fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return processServerResponse(res);
};
export const addLike = (data, token) => {
  return api("PUT", `items/${data.itemId}/likes`, token);
};

export const removeLike = (data, token) => {
  return api("DELETE", `items/${data.itemId}/likes`, token);
};
