import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
      console.log(data);
      if (data?.status === 200) {
        queryClient.setQueryData(["user"], data.data);
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

  return useMutation(signup, {
    onSuccess: async (data) => {
      console.log(data);
      if (data?.status === 200) {
        addUserToLocalStorage(data.data);
        await router.replace("/dashboard/profile");
        toast("Signed Up Successfully", {
          type: "success",
          position: "bottom-right",
        });
      }
    },
  });
};

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
