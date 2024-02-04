import React from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Search from './components/Search.jsx'
import { GetThemeValue } from './components/ThemeProvider.jsx'

function App() {
  const {darkTheme} = GetThemeValue();
  document.body.style.backgroundColor = darkTheme ? '#141D2F' : '#F6F8FF';

  return (
    <div id={darkTheme ? 'contentDark' : 'content'}>
        <Header/>
        <Search/>
    </div>
  )
}

export default App
