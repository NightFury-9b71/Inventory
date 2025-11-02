import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/auth-context";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export function useLogin() {
  const { login } = useAuth();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Use the AuthContext login method to properly store auth state
      login(data.token, data.user);
    },
  });
}
