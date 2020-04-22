import * as React from 'react';

export const ThemeContext = React.createContext(['light', function update() {}])

export const ThemeProvider = ({ children }) => {
    const [value, setValue] = React.useState('light')

    const toggleTheme = () => setValue(prevTheme => prevTheme === 'light' ? 'dark' : 'light')

    return <ThemeContext.Provider value={[value, toggleTheme]}>{children}</ThemeContext.Provider>
}