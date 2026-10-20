import React from 'react';
import Register from "@/components/pages/register";

export const metadata = {
  title: 'Регистрация',
  description: 'Регистрация нового участника в автоклубе VAGClub21',
  robots: { index: false, follow: false },
};

const Page = () => {
  return <Register />;
};

export default Page;
