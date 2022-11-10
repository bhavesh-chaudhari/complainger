import React from "react";
import { useRouter } from "next/router";
import { MdClose } from "react-icons/md";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const closeModal = async () => {
    await router.back();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-full h-full z-20 bg-modal flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          console.log("lol");
          e.stopPropagation();
        }}
        className="z-0 flex-col relative w-11/12 max-w-lg flex justify-center items-center"
      >
        <div className="p-3 bg-white flex items-center justify-between w-full border-b rounded-t-md border-gray-100 px-8 font-semibold">
          <p className="opacity-90 text-lg font-semibold">Create Complaint</p>
          <span
            onClick={closeModal}
            className="cursor-pointer transition-all duration-200 hover:bg-gray-200 rounded-full p-2"
          >
            <MdClose fontSize={18}></MdClose>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
