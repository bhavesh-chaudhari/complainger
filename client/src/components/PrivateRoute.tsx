import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserFromLocalStorage } from "../utils/localStorage";

interface Props {
  protectedRoutes: string[];
  children: JSX.Element;
}

const PrivateRoute = ({ protectedRoutes, children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const pathIsProtected = router.pathname.startsWith("/dashboard")

  useEffect(() => {
    const user = getUserFromLocalStorage();
    const isAuthenticated = user !== null;
    const protect = async () => {
      if (!isAuthenticated && pathIsProtected) {
        await router.replace("/");
      } else {
        setIsLoading(false);
      }
    };
    protect();
  }, []);

  if (isLoading && pathIsProtected) {
    return <div className="min-h-screen w-full absolute left-0 top-0 bg-gray-50"></div>;
  }

  return children;
};

export default PrivateRoute;
