'use client';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useState} from "react";
import {domAnimation, LazyMotion} from "framer-motion";
import {Toaster} from "react-hot-toast";
import {ConfigProvider} from "antd";
import {theme} from "@/styles/theme";


const Providers = ({children}) => {

  const [client] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    }
  }));

  return (
    <QueryClientProvider client={client}>
      <LazyMotion features={domAnimation}>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </LazyMotion>
      <Toaster toastOptions={{
        style: {
          fontSize: '1.6rem',
          padding: '1.2rem',
        },
      }}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
};

export default Providers;
