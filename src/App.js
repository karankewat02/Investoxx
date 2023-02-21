import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Intro from './Intro';
import Services from './Services';
import Results from './Results';
import Footer from './Footer';
import { themeContext } from './Context';
import { useContext } from 'react';

function App() {
  const theme = useContext(themeContext)
  const darkMode = theme.state.darkMode
  return (
    
    <div className='App'
      style={{background: darkMode? 'black': '', color: darkMode? 'white': '' }}
    >
      <NavBar/>
      <Intro/>
      <Services/>
      <Results/>
      <Footer/>
    </div>
  );
}

export default App;
