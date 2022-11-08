import { useState, useEffect } from "react";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { request } from "../utils/axios";
import { getUserFromLocalStorage } from "../utils/localStorage";
import jwtDecode from "jwt-decode";
import { UserType } from "../types/user";

const useUserInfo = () => {
  const [id, setId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userFromLStorage = getUserFromLocalStorage();
    const decoded = jwtDecode(userFromLStorage?.token) as {
      id: number | null;
      role: string | null;
    };

    setId(decoded.id);
    setRole(decoded.role);
  }, []);

  return { id, role };
};

const fetchComplaints = ({queryKey}: {queryKey: QueryKey}) => {

  const id = queryKey[2]
  return request({ url: `/complaints/user/${id}` });
};

export const useComplaintsData = () => {
  const { id, role } = useUserInfo();

  return useQuery({
    queryKey: ["complaints", "user", id],
    queryFn: fetchComplaints,
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false
  });
};
