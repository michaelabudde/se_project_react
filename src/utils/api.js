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
