import {useEffect} from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useUserTokenInfo, useUser } from "./useUser";

interface FormValues {
  email: string;
  password: string;
}

const login = (formValues: FormValues) => {
  return request({ url: "/auth/login", method: "post", data: formValues });
};

const signup = (formValues: FormValues) => {
  return request({ url: "/auth/signup", method: "post", data: formValues });
};

export const useLogin = () => {
  const router = useRouter();

  const queryClient = useQueryClient()

  return useMutation(login, {
    onSuccess: async (data) => {
      if (data?.status === 200) {
        queryClient.setQueryData(["user"], data?.data.id);
        addUserToLocalStorage(data.data);
        await router.replace("/dashboard/profile");
        toast("Logged In", {
          type: "success",
          position: "bottom-right",
        });
      }
    },
  });
};

export const useSignup = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation(signup, {
    onSuccess: async (data) => {
      console.log(data);
      if (data?.status === 200) {
        addUserToLocalStorage(data.data);
        queryClient.setQueryData(["auth"], data?.data.role)
        queryClient.setQueryData(["user"], data?.data.id);
        await router.replace("/dashboard/profile");
        toast("Signed Up Successfully", {
          type: "success",
          position: "bottom-right",
        });
      }
    },
  });
};

const checkAuth = async ()=>{

  const res = await request({url: "/auth/checkAuth"})

  const data = res?.data

  console.log("check auth")

  const isAuthenticated: boolean = res?.status === 200

  return {role: data?.role as string, isAuthenticated} 
}

export const useAuth = ()=>{

  const router = useRouter()

  const isProtected = router.pathname.startsWith("/dashboard")

  return useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: isProtected,
  });
}

export const logout = async () => {
  removeUserFromLocalStorage();
  toast("Logged Out Successfully", {
    type: "success",
    position: "bottom-right",
    theme: "dark",
    style: {
      marginTop: "5rem",
    },
  });
};
