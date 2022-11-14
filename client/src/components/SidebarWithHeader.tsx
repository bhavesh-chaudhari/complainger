import React, { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { UserType } from "../types/user";
import Avatar from "react-avatar";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { logout } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { GrNotes } from "react-icons/gr";
import { SiGooglemessages } from "react-icons/si";
import { RiLogoutBoxLine } from "react-icons/ri";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { useUserComplaintsCount } from "../hooks/useUser";
import { useComplaintsData } from "../hooks/useComplaints";
import UserOnlyUI from "./privateUI/UserOnlyUI";
import AdminOnlyUI from "./privateUI/AdminOnlyUI";
import { SidebarLinkType } from "../types/linkItem";
import { BiDetail } from "react-icons/bi";

const MediaQuery = dynamic(
  () => {
    return import("react-responsive");
  },
  {
    ssr: false,
  }
);

const LinkItem = ({
  item,
  complaintsCount,
  allComplaintsCount,
}: SidebarLinkType) => {
  const router = useRouter();

  return (
    <li key={item.id} className="w-[90%] flex">
      <Link
        href={item.path}
        passHref
        className={clsx(
          "flex w-full relative transition-all duration-200 shadow-sm items-center border px-4 py-2 gap-2 rounded-r-full bg-gray-50 hover:bg-blue-50",
          router.pathname === item.path && "border-blue-400",
          router.pathname !== item.path && "border-gray-100"
        )}
      >
          <span className="leading-none translate-y-[2px]">{item.icon}</span>
          <span className="leading-none font-semibold">{item.name}</span>
          {item.name === "Complaints" && (
            <span className="bg-blue-600 absolute leading-none flex items-center justify-center text-white rounded-full ml-2 top-1/2 -translate-y-1/2 right-2 w-4 h-4 p-[10px] text-[12px]">
              <UserOnlyUI>{complaintsCount}</UserOnlyUI>
              <AdminOnlyUI>{allComplaintsCount}</AdminOnlyUI>
            </span>
          )}
      </Link>
    </li>
  );
};

const ComplaintManagerHeading = ({ user }: { user: UserType | null }) => {
  return (
    <div className="flex items-start my-0 mx-auto md:mx-0 flex-col md:flex-row md:items-center">
      <h1 className="text-lg font-bold text-blue-500">Complaint Manager</h1>
      <span className="border -translate-x-2 mt-1 border-red-200 -md:translate-y-[2px] md:translate-x-0 ml-2 text-xs capitalize flex justify-center items-center px-4 py-1 rounded-full">
        {user?.role}
      </span>
    </div>
  );
};

const SidebarWithHeader = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const { data: complaintsCount } = useUserComplaintsCount();

  const { data: allComplaints } = useComplaintsData();

  const allComplaintsCount = allComplaints?.length;

  const router = useRouter();

  useEffect(() => {
    const decoded = jwtDecode(getUserFromLocalStorage().token) as any;

    setUser({ ...getUserFromLocalStorage(), role: decoded?.role });
  }, []);

  const sidebarLinks = [
    {
      id: 1,
      name: "Profile",
      path: "/dashboard/profile",
      icon: <ImProfile size={18}></ImProfile>,
    },
    {
      id: 2,
      name: "Complaints",
      path: "/dashboard/complaints",
      icon: <GrNotes size={18}></GrNotes>,
    },
    {
      id: 3,
      name: "Report",
      path: "/dashboard/report",
      icon: <BiDetail size={18}></BiDetail>,
      type: "admin",
    },
    {
      id: 4,
      name: "Messages",
      path: "/dashboard/messages",
      icon: <SiGooglemessages size={18}></SiGooglemessages>,
    },
  ];

  const handleLogout = async () => {
    logout();
    await router.replace("/");
  };

  return (
    <div className="flex relative">
      <div className="flex md:z-10 px-8 pl-4 fixed w-full shadow-sm bg-white leading-none h-14 justify-end md:justify-between items-center">
        <MediaQuery minWidth={768}>
          <ComplaintManagerHeading user={user}></ComplaintManagerHeading>
        </MediaQuery>
        <div className="">
          <div className="flex items-center gap-[6px]">
            <div className="h-8 w-8 translate-y-[3px]">
              <Avatar
                round
                maxInitials={1}
                color="#3b82f6"
                size={"30"}
                textSizeRatio={1.75}
                name={`${user?.first_name} ${user?.last_name}`}
              ></Avatar>
            </div>
            <div>
              {user?.first_name} {user?.last_name}
            </div>
          </div>
        </div>
      </div>
      <div className="flex fixed pt-14 md:pt-24 w-48 h-full min-h-screen bg-white shadow-sm z-1 flex-col items-start gap-6">
        <MediaQuery maxWidth={768}>
          <ComplaintManagerHeading user={user}></ComplaintManagerHeading>
        </MediaQuery>
        <ul className="flex w-[100%] flex-col gap-6 mt-4 md:mt-0">
          {sidebarLinks.map((item) => {
            return item.type === "admin" ? (
              <AdminOnlyUI key={item.id}>
                <span key={item.id}>
                  <LinkItem
                    item={item}
                    complaintsCount={complaintsCount}
                    allComplaintsCount={allComplaintsCount}
                  ></LinkItem>
                </span>
              </AdminOnlyUI>
            ) : (
              <span key={item.id}>
                <LinkItem
                  item={item}
                  complaintsCount={complaintsCount}
                  allComplaintsCount={allComplaintsCount}
                ></LinkItem>
              </span>
            );
          })}
        </ul>
        <Link
          href={`${router.pathname}?modal=complaint_form`}
          as={"/dashboard/complaints/create"}
          passHref
          className="bg-blue-500 text-white w-[60%] border opacity-90 hover:bg-blue-500 hover:text-white duration-300 transition-all border-blue-100 text-start gap-1 flex items-center justify-center p-2 rounded-r-full shadow-md"
        >
            <span>
              <AiOutlinePlusCircle
                color="inherit"
                size={"1.3rem"}
              ></AiOutlinePlusCircle>
            </span>
            <span className="leading-none text-lg -translate-y-[2px]">
              Create
            </span>
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border hover:bg-gray-50 transition-all duration-300 border-gray-700 text-gray-700 rounded-full w-[80%] flex justify-center gap-2 bottom-8 text-start absolute left-1/2 -translate-x-1/2"
        >
          <span className="leading-none">
            <RiLogoutBoxLine size={20}></RiLogoutBoxLine>
          </span>
          <span className="leading-none font-semibold">Logout</span>
        </button>
      </div>
      <div className="mt-14 ml-48 w-[calc(100%-192px)] min-h-[calc(100vh-56px)] bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default SidebarWithHeader;
