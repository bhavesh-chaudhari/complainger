import React from "react";
import { IoMdCreate } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import Complaint from "./complaint/Complaint";
import { useComplaintsData } from "../hooks/useComplaints";

const ComplaintsMain = () => {
  const { isLoading, data, isSuccess } = useComplaintsData();

  return (
    <div className="w-[100%] px-16 py-8 flex justify-center items-stretch">
      <div className="w-full flex bg-white rounded-lg justify-center">
        <div className="py-4 w-full">
          <div>
            <h1 className="text-2xl text-center font-bold opacity-70">
              Your Complaints
            </h1>
          </div>
          <div className="w-full flex items-center justify-center mt-12 gap-8">
            <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
              <div className="bg-yellow-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                <IoMdCreate color="#ffba64" size={24}></IoMdCreate>
              </div>
              <span className="font-bold opacity-90">0</span> Complaints Created
            </div>
            <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
              <div className="bg-rose-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                <AiOutlineEye color="#d31d1a" size={24}></AiOutlineEye>
              </div>
              <span className="font-bold opacity-90">0/0</span> Complaints
              Reviewed
            </div>
            <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
              <div className="bg-green-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                <BsCheckLg color="green" size={20}></BsCheckLg>
              </div>
              <span className="font-bold opacity-90">0/0</span> Complaints
              Resolved
            </div>
          </div>
          <div className="w-full px-12 mt-8 pt-4 border-t border-gray-200">
            {data?.data.data.complaints.map((complaint: any) => {
              return <Complaint key={complaint.id} {...complaint} ></Complaint>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsMain;
