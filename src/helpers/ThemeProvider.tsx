import { FC, memo, useEffect } from "react";

/**
 * ==> props interface
 */
interface IProps {
  children: any;
}

/**
 * ==> Component
 */
const ThemeProvider: FC<IProps> = ({ children }) => {
  const currentTheme = localStorage.getItem('theme');
  const initializeTheme = () => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
  
    if (storedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };
  useEffect(()=>{
    initializeTheme();
  },[currentTheme])
  
  return (
    <>
    {children}
    </>
  );
}

export default memo(ThemeProvider);