import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useCreateComplaint } from "../../hooks/useComplaints";

const initialFormValues = {
  title: "",
  description: "",
  type: "",
};

const ComplaintForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const {mutate: createComplaint, data, isLoading} = useCreateComplaint()

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    createComplaint(formValues)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 pt-4 bg-white w-full rounded-b-md"
    >
      <div className="flex gap-4 flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="text"
            name="title"
            id="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-gray-50 resize-y h-32 min-h-[100px] max-h-52 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            name="description"
            id="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type">Type</label>
          <select
            onChange={handleChange}
            id="type"
            name="type"
            className="bg-gray-50 appearance-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue={""}
          >
            <option value="" disabled hidden></option>
            <option value="maintainance">Maintainance</option>
            <option value="payment">Payment</option>
          </select>
        </div>
        <button className="bg-blue-500 h-10 flex items-center justify-center text-white font-bold mt-4 py-2 uppercase hover:opacity-90 transition-opacity rounded-md shadow-md">
          {isLoading ? (
            <PulseLoader color="white" size={12}></PulseLoader>
          ) : (
            "Report"
          )}
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;
