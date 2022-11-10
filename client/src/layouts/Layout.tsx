import React from "react";
import { useRouter } from "next/router";
import PrivateRoute from "../components/privateUI/PrivateRoute";
import SidebarWithHeader from "../components/SidebarWithHeader";
import Modal from "../components/Modal"
import ComplaintForm from "../components/complaint/ComplaintForm"

interface Props {
  children?: React.ReactNode;
}

const PageLayout = ({ children }: Props): JSX.Element => {
  const router = useRouter();

  const currentPagePath = router.pathname;

  const protectedRoutes = [
    "/dashboard",
  ];

  console.log(router.query.modal);

  return (
    <PrivateRoute protectedRoutes={protectedRoutes}>
      <>
        {router.query.modal === "complaint_form" && (
          <Modal>
            <ComplaintForm></ComplaintForm>
          </Modal>
        )}
        {currentPagePath.startsWith("/dashboard") ? (
          <SidebarWithHeader>{children}</SidebarWithHeader>
        ) : (
          <div>{children}</div>
        )}
      </>
    </PrivateRoute>
  );
};

export default PageLayout;
