import React, { createContext } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light')

  React.useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [theme])

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}
