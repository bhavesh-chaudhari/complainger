import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ComplaintType } from "../types/complaint";
import { request } from "../utils/axios";
import { useUserTokenInfo } from "./useUser";
import {toast} from "react-toastify"
import { useRouter } from "next/router";

const fetchComplaints = async ({queryKey}: {queryKey: QueryKey}) => {
  const id = queryKey[2]

  console.log("fetching complaints for users")

  const res = await request({ url: `/complaints/user/${id}` });
  
  const data = res?.data

  console.log(data?.data?.complaints, "fetchComplaints");

  return data?.data?.complaints;
};

const fetchAllComplaints = async () => {
  const res = await request({ url: `/complaints` });
  
  const data = res?.data;

  console.log(data?.data, "fetchAllComplaints");
  return data?.data
};

const createComplaint = (formValues: ComplaintType) => {
  return request({ url: `/complaints`, method: "post", data: formValues });
};

export const useComplaintsData = () => {
  const { id, role } = useUserTokenInfo();

  return useQuery({
    queryKey: role === "admin" ?  ["complaints"] : ["complaints", "user", id],
    queryFn: role === "admin" ? fetchAllComplaints : fetchComplaints,
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false
  });
};

export const useCreateComplaint = ()=>{

  const queryClient = useQueryClient()
  const { id, role } = useUserTokenInfo();
  const router = useRouter()

  return useMutation({
    mutationFn: createComplaint,
    onSuccess: async (data)=>{
      if(data?.status === 200){
        console.log(data.data.data.id);
        queryClient.setQueryData(["users", "complaintsCount", id], (oldData: any) => oldData + 1);
        queryClient.setQueryData(["complaints", "user", id], (oldData: any)=>{
          console.log(oldData)
          return [...oldData, data.data.data]
        });
        toast("Complant Created", {
          type: "success",
          position: "bottom-right",
        });
        await router.back()
      }
    }
  })
}