import React from "react";

const SignupForm = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col">
        <label className="mb-2" htmlFor="first_name">
          First Name
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="first_name"
          id="first_name"
        />
      </div>{" "}
      <div className="flex w-full flex-col">
        <label className="mb-2" htmlFor="last_name">
          Last Name
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="last_name"
          name="last_name"
          id="last_name"
        />
      </div>
      <div className="flex w-full flex-col">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="password"
          id="password"
        />
      </div>
      <button className="bg-blue-500 text-white font-bold mt-4 py-2 uppercase hover:opacity-90 transition-opacity rounded-sm shadow-sm">
        Signup
      </button>
    </div>
  );
};

export default SignupForm;
