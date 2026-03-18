import { apiClient } from "../../../api/axios";
import type { ApiResponse } from "../../../shared/interfaces/api-response";
import type { LoginPayload, LoginResponse } from "../../../shared/interfaces/user";

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  return data;
}

export const logout = async () => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/logout");
  return data;
}
