import React from 'react';
import { ContactSection } from '../components/ContactSection';

interface ContactPageProps {
  enquirySubject?: string;
  enquiryType?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  enquirySubject,
  enquiryType
}) => {
  return (
    <main>
      <ContactSection
        initialSubject={enquirySubject}
        initialType={enquiryType}
        isStandalonePage={true}
      />
    </main>
  );
};
