import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLayout from '../layouts/Layout';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <div className="bg-gray-50">
          <Component {...pageProps} />
        </div>
      </PageLayout>
      <ReactQueryDevtools
        initialIsOpen={false}
        position={"bottom-right"}
      ></ReactQueryDevtools>
      <ToastContainer></ToastContainer>
    </QueryClientProvider>
  );
}

export default MyApp
