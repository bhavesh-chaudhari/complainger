import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { useRouter } from "next/router";
import ComplaintPageMain from "../../../../components/complaint/ComplaintPageMain";

const index = (props: any) => {
  console.log(props);

  const router = useRouter()

  console.log(router.query)
  
  return <ComplaintPageMain></ComplaintPageMain>;
};

export default index;

// export const getStaticProps: GetStaticProps = async ({params}) => {

// console.log(params)
    
//   return {
//     props: {
//       lol: "wow",
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [{ params: { slug: "/dashboard/complaints/1/lol" } }],
//     fallback: "blocking",
//   };
// };
