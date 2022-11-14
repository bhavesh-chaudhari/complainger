import React from "react";
import FacultyStudentComplaints from "./charts/FacultyStudentComplaints";
import TotalComplaintsPieChart from "./charts/TotalComplaintsPieChart";
import ComplaintTypePloarAreaChart from "./charts/ComplaintTypePloarAreaChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { useComplaintsData } from "../hooks/useComplaints";
import { IoMdCreate } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { ComplaintType } from "../types/complaint";
import Dots from "./svgs/Dots"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const ReportMain = () => {
  const { data: complaints } = useComplaintsData();

  const days = [...Array(2)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  });

  const resolvedComplaints = complaints?.filter(
    (complaint: ComplaintType) => complaint.status === "resolved"
  );

  const reviewedComplaints = complaints?.filter(
    (complaint: ComplaintType) => !!complaint.reviewed === true
  );

  const resolvedComplaintsToday = complaints?.filter(
    (complaint: ComplaintType) =>
      complaint.status === "resolved" &&
      new Date(complaint.createdAt as string).setHours(0, 0, 0, 0) ===
        days[0].setHours(0, 0, 0, 0)
  );

  const reviewedComplaintsToday = complaints?.filter(
    (complaint: ComplaintType) =>
      !!complaint.reviewed === true &&
      new Date(complaint.createdAt as string).setHours(0, 0, 0, 0) ===
        days[0].setHours(0, 0, 0, 0)
  );

  const complaintsToday = complaints?.filter((complaint: ComplaintType) => {
    return (
      new Date(complaint.createdAt as string).setHours(0, 0, 0, 0) ===
      days[0].setHours(0, 0, 0, 0)
    );
  });

  const complaintsYesterday = complaints?.filter((complaint: ComplaintType) => {
    return (
      new Date(complaint.createdAt as string).setHours(0, 0, 0, 0) ===
      days[1].setHours(0, 0, 0, 0)
    );
  });

  const percentage =
    ((complaintsToday?.length - complaintsYesterday?.length) /
      complaintsYesterday?.length) *
    100;

  const studentCount = complaints?.filter((complaint: ComplaintType)=>{
    return complaint?.type === "student"
  }).length

  const facultyCount = complaints?.filter((complaint: ComplaintType) => {
    return complaint?.type === "faculty";
  }).length;
    
  console.log(complaintsToday, complaintsYesterday);

  return (
    <>
      {" "}
      <div className="border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl text-center font-bold opacity-90">Report</h1>
        </div>
      </div>
      <div className="my-6 px-16 flex flex-col gap-4">
        <div>
          <h3 className="font-bold opacity-70 text-xl mb-6">Visualizations</h3>
          <div className="flex items-center gap-8 flex-col justify-center w-full">
            <div className="bg-white w-full h-[300px] p-4 border rounded-md border-gray-100">
              <FacultyStudentComplaints></FacultyStudentComplaints>
            </div>
            <div className="w-full gap-8 flex justify-center items-center">
              <div className="bg-white py-4 w-full h-[300px] border border-gray-200 rounded-md">
                <TotalComplaintsPieChart></TotalComplaintsPieChart>
              </div>
              <div className="bg-white py-4 w-full h-[300px] border border-gray-200 rounded-md">
                <ComplaintTypePloarAreaChart></ComplaintTypePloarAreaChart>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold opacity-70 text-xl">General Information</h3>
          <div className="flex flex-col gap-4 overflow-hidden relative">
            <div>
              <h4 className="text-md font-bold opacity-80 text-center mb-4">
                About Complaints Today
              </h4>
              <div className="w-full text-center pt-8 pb-4 flex items-center justify-center gap-8">
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  {percentage >= 0 && (
                    <div className="bg-purple-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                      <HiTrendingUp color="purple" size={24}></HiTrendingUp>
                    </div>
                  )}
                  {percentage < 0 && (
                    <div className="bg-purple-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                      <HiTrendingDown color="purple" size={24}></HiTrendingDown>
                    </div>
                  )}
                  <span className="font-bold opacity-90">
                    {Math.floor(Math.abs(percentage))}%{" "}
                  </span>
                  {percentage >= 0 ? "Increase" : "Decrease"} in complaints
                </div>
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  <div className="bg-yellow-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                    <IoMdCreate color="#ffba64" size={24}></IoMdCreate>
                  </div>
                  <span className="font-bold opacity-90">
                    {complaintsToday?.length}
                  </span>{" "}
                  {complaintsToday?.length === 1 ? "Complaint" : "Complaints"}{" "}
                  Made
                </div>
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  <div className="bg-rose-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                    <AiOutlineEye color="#d31d1a" size={24}></AiOutlineEye>
                  </div>
                  <span className="font-bold opacity-90">
                    {reviewedComplaintsToday?.length}
                  </span>{" "}
                  {reviewedComplaintsToday?.length === 1
                    ? "Complaint"
                    : "Complaints"}{" "}
                  Reviewed
                </div>
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  <div className="bg-green-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                    <BsCheckLg color="green" size={20}></BsCheckLg>
                  </div>
                  <span className="font-bold opacity-90">
                    {resolvedComplaintsToday?.length}
                  </span>{" "}
                  {resolvedComplaintsToday?.length === 1
                    ? "Complaint"
                    : "Complaints"}{" "}
                  Resolved
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-md font-bold opacity-80 text-center mb-4">
                All Time Information
              </h4>
              <div className="w-full text-center pt-8 pb-4 flex items-center justify-center gap-8">
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  <div className="bg-yellow-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                    <IoMdCreate color="#ffba64" size={24}></IoMdCreate>
                  </div>
                  <span className="font-bold opacity-90">
                    {complaints?.length}
                  </span>{" "}
                  {complaints?.length === 1 ? "Complaint" : "Complaints"} Made
                </div>
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  <div className="bg-rose-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                    <AiOutlineEye color="#d31d1a" size={24}></AiOutlineEye>
                  </div>
                  <span className="font-bold opacity-90">
                    {reviewedComplaints?.length}
                  </span>{" "}
                  {reviewedComplaints?.length === 1
                    ? "Complaint"
                    : "Complaints"}{" "}
                  Reviewed
                </div>
                <div className="p-8 pt-10 border border-gray-100 shadow-sm rounded-xl relative">
                  <div className="bg-green-50 shadow-sm border border-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full">
                    <BsCheckLg color="green" size={20}></BsCheckLg>
                  </div>
                  <span className="font-bold opacity-90">
                    {resolvedComplaints?.length}
                  </span>{" "}
                  {resolvedComplaints?.length === 1
                    ? "Complaint"
                    : "Complaints"}{" "}
                  Resolved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportMain;
