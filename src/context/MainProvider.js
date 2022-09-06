import React, { useContext, useState } from 'react';
import { MainContext } from './MainContext.js';
export const MainProvider = ({ children }) => {
  const [currentColors, setCurrentColors] = useState({});
  return (
    <MainContext.Provider value={{ currentColors, setCurrentColors }}>
      {children}
    </MainContext.Provider>
  );
};
