import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSignup } from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const initialFormValues = {
  first_name: "",
  last_name: "",
  gender: "",
  email: "",
  mobile_number: "",
  role: "",
  department: "",
  password: "",
};

const SignupForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const {isLoading, mutate: signup} = useSignup()

  const handleChange = (e: any)=>{
    const name = e.target.name
    const value = e.target.value

    setFormValues({...formValues, [name]: value})
  }

  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    signup(formValues)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex w-full flex-col">
          <label className="mb-2" htmlFor="first_name">
            First Name
          </label>
          <input
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            name="first_name"
            id="first_name"
            value={formValues.first_name}
            onChange={handleChange}
            required
          />
        </div>{" "}
        <div className="flex w-full flex-col">
          <label className="mb-2" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="last_name"
            name="last_name"
            id="last_name"
            value={formValues.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex w-full flex-col">
          <label htmlFor="department" className="mb-2">
            Department
          </label>
          <select
            onChange={handleChange}
            id="department"
            name="department"
            className="bg-gray-50 appearance-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={""}
          >
            <option value="" disabled hidden></option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
          </select>
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2 capitalize" htmlFor="category">
            role
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            className="bg-gray-50 appearance-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={""}
          >
            <option value="" disabled hidden></option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex w-full flex-col">
          <label className="mb-2" htmlFor="mobile_number">
            Mobile No.
          </label>
          <div className="relative overflow-hidden rounded-md">
            <span
              className="z-1 border rounded-md border-gray-300 absolute flex items-center justify-center h-[100%] w-12 top-0
            left-0 bg-gray-200"
            >
              +91
            </span>
            <input
              className="bg-gray-50 z-2 pl-14 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              name="mobile_number"
              id="mobile_number"
              onChange={handleChange}
              required
              value={formValues.mobile_number}
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2 capitalize" htmlFor="gender">
            gender
          </label>
          <select
            id="gender"
            name="gender"
            onChange={handleChange}
            className="bg-gray-50 appearance-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={""}
          >
            <option value="" disabled hidden></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className="bg-blue-500 h-10 flex items-center justify-center text-white font-bold mt-4 py-2 uppercase hover:opacity-90 transition-opacity rounded-md shadow-md">
        {isLoading ? (
          <PulseLoader color="white" size={12}></PulseLoader>
        ) : (
          "Signup"
        )}
      </button>
      <p className="text-center">
        Alreeady have an account?{" "}
        <Link className="text-blue-700" href={"/login"} passHref>
          Login here
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
