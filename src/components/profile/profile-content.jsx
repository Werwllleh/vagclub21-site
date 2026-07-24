'use client'
import {useUser} from "@/hooks/useUser";
import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import Loader from "@/components/loader";
import UserForm from "@/components/user-form";
import CarForm from "@/components/car-form";
import {PlusOutlined, LogoutOutlined} from "@ant-design/icons";
import {useQueryClient} from "@tanstack/react-query";
import authService from "@/services/auth.service";
import ProfileCarCard from "@/components/profile-car-card";
import H1 from "@/components/UI/h1";
import {useLenis} from "lenis/react";
import styled from "styled-components";
import Image from "next/image";
import {customTheme} from "@/styles/theme";
import Container from "@/components/container";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import AnimateSection from "@/components/blocks/animate-section";
import PartnerBanner from "@/components/partners/partner-banner";
import scrollIntoView from "scroll-into-view-if-needed";
import ProfileCompanyCard from "@/components/profile/profile-company-card";
import {hasAdminAccess} from "@/config/roles";

const profileTabs = [
  {
    title: "Профиль",
    link: "?section=main",
  },
  {
    title: "Авто",
    link: "?section=cars",
  },
  {
    title: "Компании",
    link: "?section=companies",
  },
]

const ProfileWrap = styled.div`
`

const ProfileHeader = styled.div`
`

const ProfileHeaderBg = styled.div`
    height: 25rem;
    pointer-events: none;
    user-select: none;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        height: 40rem;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`

const ProfileBody = styled.div`
`

const ProfileAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 9rem;
    height: 9rem;
    overflow: hidden;
    margin-top: -4.5rem;
    margin-inline: auto;
    pointer-events: none;
    user-select: none;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        width: 12rem;
        height: 12rem;
        margin-top: -6.5rem;
    }

    span {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: .75rem solid ${customTheme.color.white};
        background-color: ${customTheme.color.white};
    }

    img {
        border-radius: 100%;
        object-fit: cover;
        object-position: center;
    }

    & .loader {

        &__text {
            display: none;
        }

        &__icon {
                //background-color: ${customTheme.color.white};
        }
    }
`

const TabButton = styled.button`
    border-radius: ${customTheme.radius.r20};
    font-family: ${customTheme.font.primary};
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 1;
    padding-inline: 4rem;
    padding-block: 1rem;
    background-color: ${({$active}) => (
            $active
                    ? customTheme.color.primaryLight
                    : 'transparent'
    )};
    color: ${({$active}) => (
            $active
                    ? customTheme.color.white
                    : customTheme.color.primaryDark
    )};
`

const ProfileTabs = styled.div`

    display: flex;
    margin-top: 2rem;
    max-width: max-content;
    overflow-x: auto;
    margin-inline: -1.5rem;
    padding-inline: 1.5rem;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        margin-inline: auto;
        padding-inline: 0;
    }

    ul {
        display: flex;
        align-items: center;
        padding-inline: 1rem;
        padding-block: .5rem;
        background-color: ${customTheme.color.lightBlue};
        border-radius: ${customTheme.radius.r25};
        gap: 1rem;

        li {

        }
    }
`

const ProfileSection = styled.div`
    margin-top: 5rem;
`

const ProfileSectionInner = styled(AnimateSection)`
    h1 {
        margin-bottom: 5rem;

        sup {
            color: ${customTheme.color.primary};
            font-size: 3.2rem;
            pointer-events: none;
            user-select: none;
        }
    }
`

const ProfileSectionDescription = styled.div`
    font-size: 2.4rem;
    margin-bottom: 3rem;
`

const UserProfile = styled.div``

const LogoutWrap = styled.div`
    margin-top: 4rem;
    display: flex;
    justify-content: center;

    button {
        font-size: 1.5rem;
        padding-inline: 3rem;
        padding-block: 1.2rem;
        line-height: 1;
    }
`

const UserCars = styled.div``

const CarsList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    gap: 3rem 2rem;

    & + button {
        margin-top: 5rem;
        margin-inline: auto;
        font-size: 1.5rem;
        padding-inline: 3rem;
        padding-block: 1.2rem;
        line-height: 1;
    }
`

const UserCompanies = styled.div``

const UserCompaniesList = styled.div`
    margin-bottom: 5rem;

    & > ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
        align-items: stretch;

        li {
            height: 100%;
        }
    }
`

const ProfileContent = ({activeSection}) => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSection = searchParams.get('section');

  const {isLoading, user} = useUser();

  // для admin/superadmin добавляем таб «Управление» → /admin
  const tabs = hasAdminAccess(user?.roles)
    ? [...profileTabs, {title: "Управление", link: "/admin"}]
    : profileTabs;

  const queryClient = useQueryClient();

  const [mounted, setMounted] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      // сбрасываем кэш пользователя, чтобы UI не показывал старые данные
      queryClient.removeQueries({queryKey: ['user']});
      router.push('/');
      router.refresh();
    } catch (e) {
      console.error('Ошибка при выходе из аккаунта', e);
      setIsLoggingOut(false);
    }
  };

  const [isModalActive, setIsModalActive] = useState(false);
  const [selectCarData, setSelectCarData] = useState({});

  const [isModalAddCarActive, setIsModalAddCarActive] = useState(false);
  const openAddCarModal = () => {
    setIsModalAddCarActive(true)
  }
  const closeAddCarModal = () => {
    setIsModalAddCarActive(false)
  }

  const handleOpenModal = (data) => {
    setSelectCarData(data);
    setIsModalActive(true);
  }

  const handleCloseModal = () => {
    setIsModalActive(false);
    setSelectCarData({});
  }

  useLenis((lenis) => {
    lenis._isLocked = isModalAddCarActive
  })

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <ProfileWrap className="page ppb">
        <ProfileHeader>
          <ProfileHeaderBg>
            <Image
              src={"/images/profile-header.webp"}
              alt={"Profile background image"}
              width={2500}
              height={1250}
              loading="eager"
            />
          </ProfileHeaderBg>
          <ProfileAvatar>
            {(isLoading && !user) ? (
              <Loader/>
            ) : (
              <>
                {user?.userPhoto ? (
                  <span>
                  <Image
                    src={user.userPhoto}
                    alt={"avatar"}
                    width={120}
                    height={120}
                  />
                </span>
                ) : (
                  <span style={{backgroundColor: user?.data?.color}}>
                  {user?.data?.name.substring(0, 2).toUpperCase()}
                </span>
                )}
              </>
            )}
          </ProfileAvatar>
        </ProfileHeader>
        <Container>
          <ProfileBody>
            <ProfileTabs>
              <ul>
                {tabs.map((item, index) => {

                  const param = item.link.replace('?section=', '')
                  const active = selectedSection ? selectedSection === param : index === 0;

                  if (active) {

                  }

                  return (
                    <li key={index}>
                      <TabButton
                        $active={active}
                        onClick={(e) => {
                          router.push(item.link, {scroll: false})
                          e.currentTarget.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "center",
                          })
                        }}
                        className="btn"
                      >
                        {item.title}
                      </TabButton>
                    </li>
                  )
                })}
              </ul>
            </ProfileTabs>
            <ProfileSection>
              {(activeSection === null || activeSection === 'main') && (
                <ProfileSectionInner>
                  <H1>Профиль</H1>
                  <UserProfile>
                    {user && user?.data && (
                      <UserForm type={'update'} initialValues={{
                        name: user?.data?.name,
                        instagram: user?.data?.instagram,
                      }}/>
                    )}
                  </UserProfile>
                  {user && user?.data && (
                    <LogoutWrap>
                      <Button
                        onClick={handleLogout}
                        loading={isLoggingOut}
                        danger
                        className="btn"
                      >
                        <LogoutOutlined/>
                        Выйти из аккаунта
                      </Button>
                    </LogoutWrap>
                  )}
                </ProfileSectionInner>
              )}
              {activeSection === 'cars' && (
                <ProfileSectionInner>
                  <H1>Ваши авто</H1>
                  {user?.data?.cars && !!user.data.cars.length && (
                    <UserCars>
                      <CarsList>
                        {user.data.cars.map((car) => {
                          return (
                            <li key={car.id}>
                              <ProfileCarCard carId={car.id} data={car}/>
                            </li>
                          )
                        })}
                      </CarsList>
                      <Button
                        onClick={openAddCarModal}
                        type="primary"
                        className="btn default"
                      >
                        <PlusOutlined/>
                        Добавить авто
                      </Button>
                    </UserCars>
                  )}
                </ProfileSectionInner>
              )}
              {activeSection === 'companies' && (
                <ProfileSectionInner>
                  <H1>Компании{!!user?.companies.length ? <sup>{user.companies.length}</sup> : ''}</H1>
                  {!user?.companies.length && (
                    <ProfileSectionDescription>
                      <h2>Еще нет добавленных компаний</h2>
                    </ProfileSectionDescription>
                  )}
                  <UserCompanies>
                    {!!user?.companies.length && (
                      <UserCompaniesList>
                        <ul>
                          {user.companies.map((company) => {
                            return (
                              <li key={company.id}>
                                <ProfileCompanyCard company={company} />
                              </li>
                            )
                          })}
                        </ul>
                      </UserCompaniesList>
                    )}
                    <PartnerBanner/>
                  </UserCompanies>
                </ProfileSectionInner>
              )}
            </ProfileSection>
          </ProfileBody>
        </Container>
        <div className="profile">
          <div className="container">
            {isLoading && <Loader/>}
            {!isLoading && user && Object.values(user).length && (
              <div className="profile__body">
                <div className="profile__top">
                  <div className="profile__user">

                  </div>
                </div>
                <div className="profile__bottom">
                  {user.data.cars && user.data.cars.length ? (
                    <div className="profile__cars">
                    </div>
                  ) : (
                    <div className="profile__cars--empty">
                      <p>Сейчас нет добавленных автомобилей</p>
                      <Button
                        onClick={openAddCarModal}
                        type="primary"
                        className="style-btn style-btn-primary"
                      >
                        Добавить авто
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </ProfileWrap>
      {/*<Modal className="profile-car-form" open={isModalAddCarActive} onCancel={closeAddCarModal} footer={false}>
        <CarForm type={'register'} onClose={closeAddCarModal}/>
      </Modal>*/}
    </>
  );
};

export default ProfileContent;
