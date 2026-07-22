'use client';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useState} from "react";
import {domAnimation, LazyMotion} from "framer-motion";
import {Toaster} from "react-hot-toast";
import {ConfigProvider} from "antd";
import {theme} from "@/styles/theme";
import {ReactLenis} from "lenis/react";
import 'dayjs/locale/ru';
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import Overlay from "@/components/overlay";
import AppContent from "@/components/app-content";
import AnimateCursor from "@/components/animate-cursor";

dayjs.extend(timezone);
dayjs.locale('ru');


const Providers = ({children, initialTechnicalWork = null}) => {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 60 * 1000,
            // refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <ReactLenis root options={{
        autoRaf: true,
      }} />
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          <ConfigProvider theme={theme}>
            <AppContent initialTechnicalWork={initialTechnicalWork}>
              {children}
              {/*<AnimateCursor />*/}
            </AppContent>
          </ConfigProvider>
        </LazyMotion>
        <Toaster toastOptions={{
          style: {
            fontSize: '1.4rem',
            textAlign: 'center',
            padding: '1.2rem',
            width: '100%',
            maxWidth: '40rem',
          },
        }}/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
      <Overlay />
    </>
  );
};

export default Providers;
