import React from "react";
import { useUserTokenInfo } from "../../hooks/useUser";

const AdminOnlyUI = ({ children }: { children: React.ReactNode }) => {
  const { role } = useUserTokenInfo();

  if (role === "admin") {
    return <>{children}</>;
  }

  return <></>;
};

export default AdminOnlyUI;
