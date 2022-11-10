import React from 'react'
import { PolarArea } from "react-chartjs-2";
import {ChartOptions} from "chart.js"
import { useComplaintsData } from '../../hooks/useComplaints';
import { ComplaintType } from '../../types/complaint';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Type vs Count of complaints",
    },
  },
};

const ComplaintTypePloarAreaChart = () => {

  const {data} = useComplaintsData()

  const types = data?.map((complaint: ComplaintType)=>{
    return complaint.type
  })

  const chartData = {
    labels: Array.from(new Set(types)),
    datasets: [
      {
        label: "# of Votes",
        data: types?.map((type: string, index: number) => {
          const map = types.reduce(
            (acc: any, e: any) => acc.set(e, (acc.get(e) || 0) + 1),
            new Map()
          );

          return [...map.values()][index];
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="w-full h-full">
      <PolarArea options={options} width={"100%"} height={"100%"} data={chartData} />
    </div>
  );
}

export default ComplaintTypePloarAreaChart