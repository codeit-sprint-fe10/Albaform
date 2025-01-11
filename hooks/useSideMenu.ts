import { useState } from 'react';

const useSideMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => setIsSideMenuOpen((prev) => !prev);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  return { isSideMenuOpen, toggleSideMenu, closeSideMenu };
};

export default useSideMenu;
