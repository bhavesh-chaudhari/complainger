import React from "react";
import { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useComplaintsData } from "../../hooks/useComplaints";
import { format } from "date-fns";
import { ComplaintType } from "../../types/complaint";

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Per day complaints by sudents vs faculties in last week",
    },
  },
};

const dates = [...Array(7)]
  .map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  })
  .reverse();

const labels = dates.map((d) => format(d, "do MMM yyyy"));

const FacultyStudentComplaints = () => {
  const { data } = useComplaintsData();

  const charData = {
    labels,
    datasets: [
      {
        label: "Students",
        data: dates.map((date) => {
          const modified_data = data?.filter((complaint: ComplaintType) => {
            return (
              new Date(complaint?.createdAt as string).setHours(0, 0, 0, 0) ===
                date.setHours(0, 0, 0, 0) &&
              (complaint?.created_by?.role === "student")
            );
          });

          return modified_data?.length;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Faculties",
        data: dates.map((date) => {
          const modified_data = data?.filter((complaint: ComplaintType) => {
            return (
              new Date(complaint?.createdAt as string).setHours(0, 0, 0, 0) ===
                date.setHours(0, 0, 0, 0) &&
              !!(complaint?.created_by?.role === "faculty")
            );
          });

          return modified_data?.length;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Bar
        options={options}
        width={"100%"}
        height={"100%"}
        data={charData}
      ></Bar>
    </div>
  );
};

export default FacultyStudentComplaints;
