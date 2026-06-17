import {useTechnicalWorkStatus} from "@/hooks/useTechnicalWorkStatus";
import TechnicalWork from "./pages/_technical-work";
import Loading from "../app/loading";
import SnowMode from "./snow-mode";

const AppContent = ({children}) => {
  const {isLoading, status} = useTechnicalWorkStatus()

  if (isLoading) {
    return <Loading/>
  }

  if (!Boolean(status)) {
    return <TechnicalWork/>
  }

  return (
    <>
      {children}
      <SnowMode/>
    </>
  )
}

export default AppContent;
