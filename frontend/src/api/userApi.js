import api from "./apiClient";

export const getProfile = async () => {
  return await api.get("/api/user/profile");
};
