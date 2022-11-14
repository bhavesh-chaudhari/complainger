import React from "react";
import {
  useSingleComplaintData,
  useComplaintsData,
} from "../../hooks/useComplaints";
import { ComplaintType } from "../../types/complaint";
import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "date-fns";
import Avatar from "react-avatar";

const ComplaintPageMain = () => {
  // const {data} = useSingleComplaintData()

  const router = useRouter();

  const { data } = useComplaintsData();

  const currentComplaint: ComplaintType = data?.filter(
    (complaint: ComplaintType) => complaint.id === Number(router.query.id)
  )[0];

  return (
    <div className="w-[100%] px-16 py-8 flex justify-center items-stretch">
      <div className="w-full flex p-8 flex-col bg-white rounded-lg justify-center">
        <Link
          className="mb-6 w-max hover:text-blue-400 transition-all duration-300"
          passHref
          href={"/dashboard/complaints"}
        >
            <span>{"<< "}</span>
            <span className="text-black">Back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold opacity-80">
            {currentComplaint?.title}
          </h1>
          <span className="bg-gray-50 my-3 w-max px-4 py-1 pb-2 border border-gray-200 flex leading-none shadow-sm rounded-md">
            {currentComplaint?.type}
          </span>
        </div>
        <div>
          <p>{currentComplaint?.description}</p>
        </div>
        <div>
          <div></div>
          <p>
            {currentComplaint?.createdAt &&
              format(
                new Date(currentComplaint?.createdAt as string),
                "do MMMM yyyy"
              )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPageMain;
