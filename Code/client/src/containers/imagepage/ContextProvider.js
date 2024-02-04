import React, { createContext, createRef, useContext, useLayoutEffect, useState } from 'react';
const StageContext = createContext();

function StageContextProvider({ stageRef, count_images,children }) {  
  
  return (
    <StageContext.Provider value={{stageRef, count_images}}>
      {children}
    </StageContext.Provider>
  );
}

export default StageContext;
export {StageContextProvider};