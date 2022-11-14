import React, {useState} from "react";
import { IoMdCreate } from "react-icons/io";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { BiFilter } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { useComplaintsData} from "../hooks/useComplaints";
import { useUserTokenInfo } from "../hooks/useUser";
import Complaint from "./complaint/Complaint";
import ComplaintForm from "./complaint/ComplaintForm";
import { ComplaintType } from "../types/complaint";
import AdminOnlyUI from "./privateUI/AdminOnlyUI";
import UserOnlyUI from "./privateUI/UserOnlyUI";

const ComplaintsMain = () => {

  const {role} = useUserTokenInfo()
  
  const { isLoading, data, isSuccess } = useComplaintsData()

  console.log(data)
  
  const router = useRouter()
  
  const complaints: [
    ComplaintType
  ] = data;

  // const [complaintsData, setComplaintsData] = useState(complaints)

  const resolvedComplaints = complaints?.filter(
    (complaint) => complaint.status === "resolved"
  ).length;

  const reviewedComplaints = complaints?.filter(
    (complaint) => !!complaint.reviewed === true
  ).length;

  const sorted = complaints?.filter((item) => item.createdAt)
    .sort((a, b) => {
      const aDate = new Date(a.createdAt as string);
      const bDate = new Date(b.createdAt as string);

      return bDate.getTime() - aDate.getTime();
    });

    console.log(sorted)

  return (
    <>
      {/* {router.query.modal === "complaint_form" && (
        <Modal>
          <ComplaintForm></ComplaintForm>
        </Modal>
      )} */}
      <div className="w-[100%] px-16 py-8 flex justify-center items-stretch">
        <div className="w-full flex bg-white rounded-lg justify-center">
          <div className="py-4 w-full">
            <div>
              <h1 className="text-2xl text-center font-bold opacity-70">
                <AdminOnlyUI>All Complaints</AdminOnlyUI>
                <UserOnlyUI>Your Complaints</UserOnlyUI>
              </h1>
            </div>
            <div className="w-full flex items-center justify-center mt-12 gap-8">
              <UserOnlyUI>
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  <div className="bg-yellow-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                    <IoMdCreate color="#ffba64" size={24}></IoMdCreate>
                  </div>
                  <span className="font-bold opacity-90">
                    {complaints?.length}
                  </span>{" "}
                  Complaints Created
                </div>
              </UserOnlyUI>
              <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                <div className="bg-rose-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                  <AiOutlineEye color="#d31d1a" size={24}></AiOutlineEye>
                </div>
                <span className="font-bold opacity-90">
                  {reviewedComplaints}/{complaints?.length}
                </span>{" "}
                Complaints Reviewed
              </div>
              <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                <div className="bg-green-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                  <BsCheckLg color="green" size={20}></BsCheckLg>
                </div>
                <span className="font-bold opacity-90">
                  {resolvedComplaints}/{complaints?.length}
                </span>{" "}
                Complaints Resolved
              </div>
            </div>
            <div className="w-full px-[8%] mt-8 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-start">
                <div className="relative">
                  <label
                    htmlFor="filter"
                    className="absolute top-4 -translate-y-1/2 left-2"
                  >
                    <BiFilter></BiFilter>
                  </label>
                  <select
                    id="filter"
                    name="filter"
                    className="bg-transparent focus:outline-none rounded-md px-1 pr-2 py-1 pl-6 appearance-none border border-gray-300 text-gray-900 text-sm block "
                    defaultValue={""}
                  >
                    <option value="" disabled hidden>
                      Filter
                    </option>
                    <option value="all">All</option>
                    <option value="resolved">Resolved</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="sort">Sort By Date</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <UserOnlyUI>
                  <div>
                    <Link
                      href={`${router.pathname}?modal=complaint_form`}
                      as={"/dashboard/complaints/create"}
                      passHref
                      className="flex items-center gap-1 bg-slate-50 py-1 px-2 rounded-md"
                    >
                        <span className="translate-y-[1.5px]">
                          <AiOutlinePlus></AiOutlinePlus>
                        </span>
                        <span>Create New</span>
                    </Link>
                  </div>
                </UserOnlyUI>
              </div>
              <div className="mt-6">
                {complaints?.map((complaint: any) => {
                  return (
                    <div key={complaint.id}>
                      <Complaint {...complaint}></Complaint>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintsMain;
