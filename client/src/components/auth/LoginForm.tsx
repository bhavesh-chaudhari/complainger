import React, { useState } from "react";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { useLogin } from "../../hooks/useAuth";

const initialFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const { isLoading, mutate: login } = useLogin();

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          type="email"
          name="email"
          id="email"
          required
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          type="text"
          name="password"
          id="password"
          required
          onChange={handleChange}
        />
      </div>
      <button className="bg-blue-500 h-10 flex items-center justify-center text-white font-bold mt-4 py-2 uppercase hover:opacity-90 transition-opacity rounded-md shadow-md">
        {isLoading ? (
          <PulseLoader color="white" size={12}></PulseLoader>
        ) : (
          "Login"
        )}
      </button>
      <p className="text-center">
        Don't have an account?{" "}
        <Link className="text-blue-700" href={"/"} passHref>
          Signup here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
