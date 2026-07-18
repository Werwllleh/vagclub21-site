'use client'
import styled from "styled-components";
import {customTheme} from "@/styles/theme";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Modal} from "antd";
import PartnerForm from "@/components/forms/partner-form";
import {TYPE} from "@/constants";
import {useLenis} from "lenis/react";
import SvgIcon from "@/components/svg-icon";


const CompanyCard = styled.div`
    position: relative;
    border-radius: ${customTheme.radius.r10};
    border: 1px solid ${customTheme.color.greyLight};
    cursor: pointer;
    aspect-ratio: 0.8;
    display: flex;
    flex-direction: column;
`

const CompanyCardInner = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const CompanyCardLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 1rem;
    height: 20rem;
    flex: 0 0 auto;

    img {
        pointer-events: none;
        user-select: none;
    }
    
    svg {
        width: 7rem;
        height: 7rem;
        color: ${customTheme.color.primary};
    }
`

const CompanyCardInfo = styled.div`
    flex: 1;
    padding-inline: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-block: 2rem;
    background-color: ${customTheme.color.greyLight};
`

const CompanyCardTitle = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
`

const CompanyCardTags = styled.div`
    margin-top: auto;

    ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        li {
            position: relative;

            &:not(:last-child) {
                padding-right: 1.6rem;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0.6rem;
                    bottom: 0;
                    margin-block: auto;
                    width: .5rem;
                    height: .5rem;
                    border-radius: 100%;
                    background-color: ${customTheme.color.primaryLight};
                }
            }

            span {
                font-size: 1.1rem;
                font-weight: 300;
            }
        }
    }
`

const CompanyLabel = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
    height: auto;
    
    span {
        border-radius: ${customTheme.radius.r15};
        padding-block: .75rem;
        padding-inline: 1.25rem;
        font-size: 1.4rem;
        font-weight: 500;
        color: ${customTheme.color.white};
    }
`


const ProfileCompanyCard = ({company}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useLenis()._isLocked = isModalOpen;

  const openModal = () => {
    if (!company.blacklist) {
      setIsModalOpen(true);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  if (!company) return null;

  return (
    <>
      <CompanyCard onClick={openModal}>
        <CompanyLabel>
          {company.active && <span style={{backgroundColor: customTheme.color.positive}}>Опубликована</span>}
          {company.blacklist && <span style={{backgroundColor: customTheme.color.red}}>Заблокирована</span>}
          {company.on_check && <span style={{backgroundColor: customTheme.color.new}}>На проверке</span>}
        </CompanyLabel>
        <CompanyCardInner>
          <CompanyCardLogo>
            {company.logo && company.logo?.url ? (
              <Image src={company.logo.url} alt={company.title} width={70} height={70}/>
            ) : (
              <SvgIcon name="no_photo" />
            )}
          </CompanyCardLogo>
          <CompanyCardInfo>
            <CompanyCardTitle>
              <h5>{company.title}</h5>
            </CompanyCardTitle>
            {company?.categories?.length && (
              <CompanyCardTags>
                <ul>
                  {company.categories.map((category) => (
                    <li key={category.id}>
                      <span>{category?.title}</span>
                    </li>
                  ))}
                </ul>
              </CompanyCardTags>
            )}
          </CompanyCardInfo>
        </CompanyCardInner>
      </CompanyCard>
      <Modal
        className="custom-modal"
        centered={true}
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
        width={'auto'}
      >
        <PartnerForm type={TYPE.UPDATE} onClose={closeModal} values={company} />
      </Modal>
    </>
  );
};

export default ProfileCompanyCard;
