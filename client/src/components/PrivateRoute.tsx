export default "lol"
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { getUserFromLocalStorage } from "../utils/localStorage";

// interface Props {
//   protectedRoutes: string[];
//   children: JSX.Element;
// }

// const PrivateRoute = ({ protectedRoutes, children }: Props) => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const router = useRouter();

//   const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

//   useEffect(() => {
//     const user = getUserFromLocalStorage();
//     const isAuthenticated = user !== null;
//     const protect = async () => {
//       if (!isAuthenticated && pathIsProtected) {
//         await router.replace("/signup");
//         setIsLoading(false);
//       } else {
//         setIsLoading(false);
//       }
//     };
//     protect();
//   }, []);

//   if (isLoading && pathIsProtected) {
//     return <div className="black-screen"></div>;
//   }

//   return children;
// };

// export default PrivateRoute;
