import React, { createContext, useContext, useState, useCallback } from 'react';

type SectionContextType = {
  isCertificatesExpanded: boolean;
  isBeyondCodeExpanded: boolean;
  expandCertificates: () => void;
  expandBeyondCode: () => void;
  toggleCertificates: () => void;
  toggleBeyondCode: () => void;
  setCertificatesExpanded: (val: boolean) => void;
  setBeyondCodeExpanded: (val: boolean) => void;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCertificatesExpanded, setCertificatesExpanded] = useState(false);
  const [isBeyondCodeExpanded, setBeyondCodeExpanded] = useState(false);

  const expandCertificates = useCallback(() => {
    setCertificatesExpanded(true);
    const element = document.getElementById('certifications');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const expandBeyondCode = useCallback(() => {
    setBeyondCodeExpanded(true);
    const element = document.getElementById('beyond');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const toggleCertificates = useCallback(() => setCertificatesExpanded(prev => !prev), []);
  const toggleBeyondCode = useCallback(() => setBeyondCodeExpanded(prev => !prev), []);

  return (
    <SectionContext.Provider value={{
      isCertificatesExpanded,
      isBeyondCodeExpanded,
      expandCertificates,
      expandBeyondCode,
      toggleCertificates,
      toggleBeyondCode,
      setCertificatesExpanded,
      setBeyondCodeExpanded
    }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};
