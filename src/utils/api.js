import { baseUrl } from "./constants";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return (
    res
      .json()
      // runs if res does not have a json body/ fails to parse
      .catch(() => {
        return Promise.reject(new Error(`Error: ${res.status}`));
      })
      // we pass back the error message from the backend if it was json
      .then((resBody) => {
        return Promise.reject(new Error(resBody.message));
      })
  );
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

export const getItems = async (token) => {
  try {
    const response = await api("GET", "/items", token);

    return response; // Return the response from the API call
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching items:", error);
    throw error; // Rethrow the error to be handled in the calling code
  }
};

export const addItem = async (token, newItem) => {
  try {
    const res = await api("POST", "/items", token, newItem);
    return res; // Return the response
  } catch (error) {
    // Handle errors if needed
    console.error("Error adding item:", error);
    throw error; // Rethrow the error to be handled in the calling code
  }
};

export const deleteItem = async (token, itemId) => {
  try {
    const res = await api("DELETE", `/items/${itemId}`, token);
    return res;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; // Rethrow the error to be handled in the calling code
  }
};

export const likeCard = async (token, itemId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
  const endpoint = `/items/${itemId}/likes`;

  try {
    const response = await api(method, endpoint, token);
    return response;
  } catch (error) {
    console.error(`Error ${isLiked ? "removing" : "adding"} like:`, error);
    throw error;
  }
};

export const fetchUserInfo = async (token) => {
  const currentUser = await api("GET", "/users/me", token);
  if (currentUser) {
    return currentUser.data;
  } else {
    console.error("Can't access user");
  }
};
export const updateProfile = async (token, data) => {
  try {
    const updatedInfo = await api("PATCH", "/users/me", token, data);
    return updatedInfo;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Rethrow the error to be handled in the calling code
  }
};
