import React from 'react'
import {Pie} from "react-chartjs-2"
import {ChartOptions} from "chart.js"
import { useComplaintsData } from '../../hooks/useComplaints';
import { ComplaintType } from '../../types/complaint';

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "All Compaints Made",
    },
  },
};

const TotalComplaintsPieChart = () => {

    const {data} = useComplaintsData()

    const studentComplaints = data?.filter((complaint: ComplaintType)=>{
        return complaint.created_by?.role === "student"
    })

    const facultyComplaints = data?.filter((complaint: ComplaintType) => {
      return complaint.created_by?.role === "faculty";
    });

    const chartData = {
      labels: [`Students`, `Faculties`],
      datasets: [
        {
          label: "# of Votes",
          data: [studentComplaints?.length, facultyComplaints?.length],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    
  return (
    <div className="w-full h-full">
      <Pie options={options} width={"100%"} height={"100%"} data={chartData} />
    </div>
  );
}

export default TotalComplaintsPieChart