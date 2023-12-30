export const signup = (name, avatar, email, password) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name, avatar, email, password }),
});
export const login = (email, password) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
