import { QueryKey, useQuery } from "@tanstack/react-query";
import { request } from "../utils/axios";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { UserType } from "../types/user";

export const useUserTokenInfo = () => {
  const [id, setId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter()

  useEffect(() => {
    const userFromLStorage = getUserFromLocalStorage();

    if(!userFromLStorage){
      return
    }

    const decoded = jwtDecode(userFromLStorage?.token) as {
      id: number | null;
      role: string | null;
      email: string | null;
    };

    setId(decoded.id);
    setRole(decoded.role);
    setEmail(decoded.email);
  }, [router.pathname]);

  return { id, role, email };
};

const fetchUser = async ({ queryKey }: { queryKey: QueryKey }) => {
  const id = queryKey[1];
  const res = await request({ url: `/users/${id}` });

  const data = res?.data;

  return data;
};

export const useUser = ()=>{

   const {id} = useUserTokenInfo()

   return useQuery({
     queryKey: ["users", id],
     queryFn: fetchUser,
     enabled: !!id,
     refetchOnWindowFocus: false,
     staleTime: Infinity,
     refetchOnMount: false,
   });
}

const fetchComplaintsCount = async ({ queryKey }: { queryKey: QueryKey }) => {
  const id = queryKey[2];
  const res = await request({ url: `/users/${id}?complaints_count=true` });

  const data = res?.data

  return data.data._count.complaints as number
};

export const useUserComplaintsCount = () => {
  const { id } = useUserTokenInfo();

  return useQuery({
    queryKey: ["users", "complaintsCount", id],
    queryFn: fetchComplaintsCount,
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
  });
};
