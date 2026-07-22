'use client'
import {useTechnicalWorkStatus} from "@/hooks/useTechnicalWorkStatus";
import TechnicalWork from "./pages/_technical-work";
import Loading from "@/components/loading";
import SnowMode from "./snow-mode";
import CookieAlert from "@/components/cookie-alert";

const AppContent = ({children, initialTechnicalWork = null}) => {
  const {isLoading, status} = useTechnicalWorkStatus(initialTechnicalWork)

  if (isLoading) {
    return <Loading/>
  }

  if (!Boolean(status)) {
    return <TechnicalWork/>
  }

  return (
    <>
      {children}
      <CookieAlert />
      <SnowMode/>
    </>
  )
}

export default AppContent;
