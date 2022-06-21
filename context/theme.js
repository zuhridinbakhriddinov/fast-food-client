import React, {createContext, useContext, useState} from 'react';

const Context = createContext();


export const ThemeProvider = ({children}) => {


    const [theme, setTheme] = useState("light");


    return (
        <Context.Provider value={
            [theme, setTheme]
        }>{children}</Context.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(Context)
}

