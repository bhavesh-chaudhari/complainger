import React from "react";
import { useUserTokenInfo } from "../../hooks/useUser";

const UserOnlyUI = ({ children }: { children: React.ReactNode }) => {
  const { role } = useUserTokenInfo();

  if (role === "student" || role === "faculty") {
    return <>{children}</>;
  }

  return <></>;
};

export default UserOnlyUI;
