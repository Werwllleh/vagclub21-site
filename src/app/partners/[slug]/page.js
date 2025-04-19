import React from 'react';
import Loader from "@/components/loader";
import PartnerDetail from "@/components/pages/partners/partner-detail";

const Page = async ({params}) => {

  const {slug} = await params;

  return (
    <div className="page">
      {!slug ? <Loader /> : <PartnerDetail slug={slug} />}
    </div>
  );
};

export default Page;
