export const signup = (name, avatar, email, password) => ({
  name,
  avatar,
  email,
  password,
});
export const login = (email, password) => ({ email, password });

/* export const validateToken = (token) => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
}); */
// wrote this code but never used it //
