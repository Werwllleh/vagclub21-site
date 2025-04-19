import React from 'react';
import Link from "next/link";

const PartnerCard = ({partner}) => {

  // console.log(partner);

  return (
    <div className="partner-card">
      <div className="partner-card__body">
        <div className="partner-card__header"></div>
        <div className="partner-card__info">
          <h2 className="partner-card__title">{partner.title}</h2>
          {!!partner.partnersCategories.length && (
            <div className="partner-card__categories">
              {partner.partnersCategories.map(category => {
                return (
                  <div
                    key={category.id}
                    className="partner-card__categories_item"
                  >
                    {category.label}
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div className="partner-card__footer">
          <Link className="style-btn style-btn-default" href={`/partners/${partner.slug}`}>Подробнее</Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
