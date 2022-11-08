import React from "react";

const Complaint = (props: any) => {
  const { id, title, description, createdAt } = props;

  console.log(props)

  console.log(id, title);

  return (
    <a className="p-2 border border-blue-50 rounded-md flex flex-col">
      <div>
        <h4 className="truncate">
          <span className="font-bold">{title}</span> -{" "}
          <span>{description}</span>
        </h4>
        <p>
          Created{" "}
          {/* <span className="border-b font-bold border-blue-600">
            Bhavesh Chaudhari
          </span>{" "} */}
          on 8th November
        </p>
      </div>
    </a>
  );
};

export default Complaint;
