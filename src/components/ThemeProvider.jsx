import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

// Creating context object
const ThemeContext = createContext()

// Creating context provider component that wraps its children with the ThemeContext.Provider
export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false) // Managing theme state

    const toggleTheme = () => setDarkTheme((prevTheme) => !prevTheme) // Providing toggleTheme function

    return (
        <ThemeContext.Provider value={{darkTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// Validating props
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const GetThemeValue = () => useContext(ThemeContext)

// Explanation:

// When you use GetThemeValue in a component, it will call useContext(ThemeContext).
// This hook will look up the component tree to find the nearest ThemeContext.Provider and return its value.
// In this case, the value is an object containing darkTheme (a boolean) and toggleTheme (a function to toggle the theme).
// So, GetThemeValue essentially provides access to the current theme state and related functions throughout the component tree where it's used.