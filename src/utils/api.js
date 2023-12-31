import { baseUrl } from "./constants";
export const api = async (method, path, authToken = null, data = null) => {
  const baseUrl = "http://localhost:3001";
};
export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(processServerResponse);
};

export const addClothingItem = (newItem) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.imageUrl,
    }),
  }).then(processServerResponse);
};

export const deleteClothingItems = (_id) => {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(processServerResponse);
};
