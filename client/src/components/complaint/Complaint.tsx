import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { format} from "date-fns";
import { useUserTokenInfo } from "../../hooks/useUser";
import UserOnlyUI from "../privateUI/UserOnlyUI";
import { convertToSlug } from "../../utils/convertToSlug";
import Link from "next/link";

const Complaint = (props: any) => {
  const {
    userId,
    title,
    description,
    createdAt,
    reviewed,
    status,
    type,
    updatedAt,
    created_by,
    id
  } = props;
  const { role } = useUserTokenInfo();

  return (
    <Link
      className="p-4 py-6 pr-8 hover:text-blue-500 transition-all duration-200 cursor-pointer border border-gray-100 flex flex-col"
      href={`/dashboard/complaints/${id}/${convertToSlug(title)}`}
      passHref
    >
        <div className="">
          <h4 className="truncate">
            <span className="font-bold opacity-90">{title}</span> -{" "}
            <span className="text-black">{description}</span>
          </h4>
          <div className="text-black mt-3">
            <span className="bg-gray-50 w-max px-4 py-1 pb-2 border border-gray-200 flex leading-none shadow-sm rounded-md">
              {type}
            </span>
            <div className="flex items-center mt-2 justify-between">
              <p className="text-gray-800">
                Created{" "}
                {role === "admin" && (
                  <>
                    <span>by</span>{" "}
                    <span className="border-b font-bold border-blue-600">
                      {created_by.first_name} {created_by.last_name}
                    </span>
                  </>
                )}{" "}
                on {format(new Date(createdAt), "do MMMM yyyy")}
              </p>
              <div className="flex items-center gap-2">
                {status === "resolved" && (
                  <span className="translate-y-[1.5px]">
                    <BsFillPatchCheckFill
                      size={18}
                      color="green"
                    ></BsFillPatchCheckFill>
                  </span>
                )}
                <UserOnlyUI>
                  {reviewed === true ? (
                    <span title="Reviewed" className="translate-y-[1.5px]">
                      <AiOutlineEye color="purple" size={20}></AiOutlineEye>
                    </span>
                  ) : (
                    <span title="Not reviewed" className="translate-y-[1.5px]">
                      <AiOutlineEyeInvisible
                        color="#da4240"
                        size={20}
                      ></AiOutlineEyeInvisible>
                    </span>
                  )}
                </UserOnlyUI>
              </div>
            </div>
          </div>
        </div>
    </Link>
  );
};

export default Complaint;
