import { baseUrl } from "./constants";
export const api = async (method, path, authToken = null, data = null) => {
  const baseUrl = "http://localhost:3001";
  let options;

  switch (method) {
    case "POST":
    case "PATCH":
    case "PUT":
      const body = data ? JSON.stringify(data) : null;
      options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body,
      };
      break;
    case "DELETE":
      options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      break;
    case "GET":
      options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      break;
    case "AUTH":
      options = data;
      break;
    default:
      throw new Error(`Method not supported: ${method}`);
  }

  try {
    const res = await fetch(`${baseUrl}/${path}`, options);

    if (!res.ok) {
      throw new Error(`Oops there's an error!: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
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
