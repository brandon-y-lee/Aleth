import React, { createContext, useContext, useState, useEffect } from 'react';

const TechPackContext = createContext();

export const useTechPack = () => {
  const context = useContext(TechPackContext);
  if (!context) {
    throw new Error('useTechPack must be used within a TechPackProvider');
  }
  return context;
};

export const TechPackProvider = ({ children, initialTechPackData, onUpdateTechPackData }) => {
  const [techPackData, setTechPackData] = useState(initialTechPackData);

  useEffect(() => {
    if (onUpdateTechPackData) {
      onUpdateTechPackData(techPackData);
    }
  }, [techPackData]);
  
  return (
    <TechPackContext.Provider value={{ techPackData, setTechPackData }}>
      {children}
    </TechPackContext.Provider>
  );
};
