'use client'
import React, {useEffect} from 'react';
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const PartnerCardItem = styled(Link)`
`

const PartnerCardInner = styled.div`
`

const PartnerCardLogo = styled.div`
`

const PartnerCard = ({partner}) => {

  if (!partner) return null;

  useEffect(() => {
    console.log(partner)
  }, [partner]);

  return (
    <PartnerCardItem href={partner?.slug || '#'}>
      <PartnerCardInner>
        <PartnerCardLogo>
          <Image
            src={partner?.logo?.url}
            alt={partner?.logo?.alt || 'logo'}
            width={partner?.logo?.width || 200}
            height={partner?.logo?.height || 200}
          />
        </PartnerCardLogo>
      </PartnerCardInner>
    </PartnerCardItem>
  );
};

export default PartnerCard;
