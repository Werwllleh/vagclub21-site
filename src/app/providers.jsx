'use client';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useState} from "react";
import {domAnimation, LazyMotion} from "framer-motion";
import {Toaster} from "react-hot-toast";
import {ConfigProvider} from "antd";
import {theme} from "@/styles/theme";

const Providers = ({children}) => {

  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <LazyMotion features={domAnimation}>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </LazyMotion>
      <Toaster/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
};

export default Providers;
