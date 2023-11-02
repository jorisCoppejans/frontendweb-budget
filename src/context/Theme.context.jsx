import { createContext, useState, useCallback, useMemo, useContext } from "react";

export const ThemeContext = createContext();

export const themes = {
    dark:'dark', light:'light'
}

export const useThemeColors = () =>{
  const {theme, oppositeTheme} = useContext(ThemeContext);
  return {theme, oppositeTheme};
}

export const ThemeProvider = ({children}) => {

    const [theme, setTheme]= useState(localStorage.getItem('themeMode') || themes.dark);

    const toggleTheme = useCallback( () => {
        const newTheme = (theme === themes.dark ? themes.light : themes.dark);
        setTheme(newTheme);
        localStorage.setItem('themeMode', newTheme);
    }, [theme])

    const oppositeTheme = useMemo(() =>
        theme === themes.dark ? themes.light : themes.dark, [theme]);


    const value = useMemo(() => ({theme, toggleTheme, oppositeTheme}),
     [theme, toggleTheme, oppositeTheme]);

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}