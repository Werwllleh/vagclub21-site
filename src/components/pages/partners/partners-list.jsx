import PartnerCard from "@/components/pages/partners/partner-card";

const PartnersList = ({partners, filteredPartners}) => {

  return (
    <div className="partners-list">
      {!!partners?.length && partners.map(partner => {
        return <PartnerCard partner={partner} key={partner.slug} />
      })}
    </div>
  );
};

export default PartnersList;
