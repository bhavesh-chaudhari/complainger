import Head from "next/head";
import type { NextPage } from "next";
import SignupForm from "../components/auth/SignupForm";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Complainger</title>
      </Head>
      <>
        <div className="flex py-8 flex-col items-center justify-center min-h-screen">
          <div className="mb-4">
            <h1 className="mb-4 text-center px-3 text-2xl font-bold opacity-80 uppercase">
              Signup to <span className="text-blue-600" >Complainger</span>
            </h1>
          </div>
          <div className="w-[90%] lg:w-[100%] max-w-[550px]">
            <SignupForm></SignupForm>
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
