import React from 'react';
import Loader from "@/components/loader";
import PartnerDetail from "@/components/pages/partners/partner-detail";
import PartnersService from "@/services/partners.service";

const Page = async ({params}) => {

  const {slug} = await params;

  const {data: partner} = await PartnersService.fetchPartnerInfo(slug);

  return (
    <div className="page">
      {!slug ? <Loader /> : <PartnerDetail partner={partner} />}
    </div>
  );
};

export default Page;
