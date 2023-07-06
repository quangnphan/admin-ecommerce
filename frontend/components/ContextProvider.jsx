'use client'
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  userProfile: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [currentMode, setCurrentMode] = useState(''); // Define currentMode state
  const [mode, setMode] = useState(''); // Define mode state

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);