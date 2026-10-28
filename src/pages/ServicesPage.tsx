import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { BusinessEnquiryCTA } from '../components/BusinessEnquiryCTA';
import type { ServiceItem } from '../types';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  onSelectServiceForEnquiry: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForEnquiry
}) => {
  return (
    <main>
      <ServicesSection
        onNavigate={onNavigate}
        onSelectServiceForEnquiry={onSelectServiceForEnquiry}
        isStandalonePage={true}
      />
      <BusinessEnquiryCTA onNavigate={onNavigate} />
    </main>
  );
};
