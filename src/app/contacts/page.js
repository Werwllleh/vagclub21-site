import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import ContactsContent from "@/components/pages/contacts/contacts-content";

export const metadata = {
  title: PUBLIC_PAGES.CONTACTS.SEO_TITLE,
  description: PUBLIC_PAGES.CONTACTS.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page">
      <ContactsContent />
    </div>
  );
};

export default Page;
