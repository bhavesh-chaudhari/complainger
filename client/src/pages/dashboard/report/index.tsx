import React, { useRef } from "react";
import { NextPage } from "next";
import ReportMain from "../../../components/ReportMain";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const index: NextPage = () => {
  const printRef = React.useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current as any;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pageWidth = pdf.internal.pageSize.getWidth();
    // const pageHeight = pdf.internal.pageSize.getHeight();

    // console.log(pdf.internal.pageSize.getHeight());

    // const widthRatio = pageWidth / canvas.width;
    // const heightRatio = pageHeight / canvas.height;
    // const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    // const canvasWidth = canvas.width * ratio;
    // const canvasHeight = canvas.height * ratio;

    // const marginX = (pageWidth - canvasWidth) / 2;
    // const marginY = (pageHeight - canvasHeight) / 2;

    const pdfHeight = (imgProperties.height * pageWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pageWidth, pdfHeight);
    pdf.save(`complaints-report.pdf`);
  };

  return (
    <div className="w-[100%] flex-col px-16 py-8 flex justify-center items-stretch">
      <div
        ref={printRef}
        className="w-ful py-8 flex flex-col bg-white rounded-lg justify-center"
      >
        <ReportMain></ReportMain>
      </div>
      <div onClick={handleDownloadPdf} className="flex justify-center">
        <button className="bg-blue-500 h-10 flex items-center justify-center text-white font-bold mt-4 py-2 px-4 uppercase hover:opacity-90 transition-opacity rounded-md shadow-md">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default index;
