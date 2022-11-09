import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  protectedRoutes: string[];
  children: JSX.Element;
}

const PrivateRoute = ({ protectedRoutes, children }: Props) => {
  const router = useRouter();

  const pathIsProtected = router.pathname.startsWith("/dashboard");

  const { data, isLoading } = useAuth();

  const isAuthenticated = data?.isAuthenticated;

  useEffect(() => {
    const user = getUserFromLocalStorage();

    const protect = async () => {
      if (!isLoading && !isAuthenticated) {
        await router.replace("/");
      }
    };
    protect();
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated && pathIsProtected) {
    return (
      <div className="min-h-screen w-full absolute left-0 top-0 bg-gray-50"></div>
    );
  }

  return children;
};

export default PrivateRoute;
