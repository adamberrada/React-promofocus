import React,{ useState, useEffect, useContext} from 'react';
import WebFont from 'webfontloader';
import { ThemeContext , ThemeProvider } from './theme';
import Header from './components/Header';
import InsideSession from './components/insideSession';
import BDL from './components/BDL';
import sessionAudio from './audio/bell.mp3';
import './App.css';

/**
 * building the promosfocus app using react.
 * 
 * @returns 
 */
function App() {
  const { theme , toggleTheme } = useContext(ThemeContext);
  const [themeText , setThemeText] = useState('light');

  const buttonTheme = {
    backgroundColor: theme.buttonColor,
     color: theme.buttonTextColor ,
      border: theme.border,
    
  }
  const footer1 = {
    color : 'red',
    textAlign: 'center',
    fontSize: '15px'
    
  }
  const footer2 = {
    color : theme.buttonTextColor,
    textAlign: 'center',
    fontSize: '10px'

  }

  const handleToggleTheme = () => {
    toggleTheme();
    setThemeText(prevText => (prevText === 'light' ? 'dark' : 'light'));
  }

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);


  const incrementBreakLength = () => {
      setBreakLength(lastBreaklength => lastBreaklength < 60 ? lastBreaklength + 1 : 60);
  }

  const decrementBreakLength = () => {
      setBreakLength( lastBreaklength => lastBreaklength > 1 ? lastBreaklength - 1 : 1);
  }
  const incrementSessionLength = () => {
    setSessionLength(lastSessionlength => lastSessionlength < 60 ? lastSessionlength + 1 : 60);
  }
  const decrementSessionLength = () =>  {
    setSessionLength(lastSessionlength => lastSessionlength > 1 ? lastSessionlength -1 : 1);
  }
  const resetSessionLength = () => {
    setSessionLength(25);
  };
  const resetBreakLength = () => {
    setBreakLength(5);
  };
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Sawarabi Mincho']
      }
    })
    document.body.style.backgroundColor = theme.buttonColor;
    document.body.style.color = theme.color;

  } , [theme]);

 

  return ( 
    <div className='project-container' >
    {/*Rendering my components inside app function */}
    <Header className='header' />
    <button style={buttonTheme} className='buttonTheme' onClick={handleToggleTheme}>
       {themeText}
      </button>
    <BDL className='bdl'
    theme={theme}
     breakLength={breakLength}
    sessionLength={sessionLength}
    maxBreak={incrementBreakLength}
    minBreak={decrementBreakLength}
    maxSession={incrementSessionLength} 
    minSession={decrementSessionLength} />
    <InsideSession theme={theme} className='insideSession' initialSessionMinutes={sessionLength}
    initialSessionSeconds={0}
    initialBreakMinutes={breakLength} 
    initialBreakSeconds={0} 
    resetSession={resetSessionLength} 
    resetBreak={resetBreakLength} 
    />
    <audio id='beep' src={sessionAudio} />
    <div>
    <div style={footer1}>designed and coded by</div>
    <div  style={footer2}>Adam Berrada</div>
    </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
