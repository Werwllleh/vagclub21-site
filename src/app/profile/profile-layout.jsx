'use client'
import {useEffect} from 'react';
import AuthTokenService from '@/services/auth-token.service';
import UserService from '@/services/user.service';
import {useUser} from "@/hooks/useUser";

/*export const metadata = {
  title: PUBLIC_PAGES.PRODUCTS.SEO_TITLE,
  description: PUBLIC_PAGES.PRODUCTS.SEO_DESCRIPTION,
};*/

const ProfileLayout = () => {

  const {isLoading, user} = useUser();

  console.log(user)

  return (
    <div>
      PROFILE
    </div>
  );
};

export default ProfileLayout;
