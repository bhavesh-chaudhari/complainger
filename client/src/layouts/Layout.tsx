import React from "react";
import { useRouter } from "next/router";
import PrivateRoute from "../components/PrivateRoute";
import SidebarWithHeader from "../components/SidebarWithHeader";

interface Props {
  children?: React.ReactNode;
}

const PageLayout = ({ children }: Props): JSX.Element => {
  const router = useRouter();

  const currentPagePath = router.pathname;

  const protectedRoutes = [
    "/dashboard",
  ];

  return (
    <PrivateRoute protectedRoutes={protectedRoutes}>
      <>
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
