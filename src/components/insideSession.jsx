import React  from 'react';
import UseTimer from './useTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay , faCirclePause, faRotateRight } from '@fortawesome/free-solid-svg-icons';

const insideSession = ({
  initialSessionMinutes,
  initialSessionSeconds,
  initialBreakMinutes,
  initialBreakSeconds,
  resetBreak,
  resetSession,
  theme
    }) => {
 const {minutes,seconds,isWarning, isSession,pauseTimer,resetTimer,sessionTimer } = UseTimer(
  initialSessionMinutes,
  initialSessionSeconds,
  initialBreakMinutes,
  initialBreakSeconds,
  resetBreak, 
  resetSession);

  const spanStyle = {
    color: isWarning ? 'red' : 'white',
    fontWeight: 'bold',
    fontSize: '25px',
   };
   const BtnStyle = {
    width: '50px',
    height: '40px',
    margin: '10px 5px',
    color: theme.color,
    fontWeight: 'bold',
    backgroundColor: theme.buttonColor
   }
   const styleContainer = {
    border: theme.border
   }

  return (
    <div className='inside-session' style={styleContainer}>
       <p style={spanStyle} id='timer-label'>{isSession ? 'Session' : 'Break'}</p>
        <div style={spanStyle} id='time-left'>
        {minutes < 10? `0${minutes}`: minutes }:{seconds < 10 ? `0${seconds}`: seconds} 
        </div>
        <div>
        <button className='btn' id='start_stop' style={BtnStyle} onClick={sessionTimer}><FontAwesomeIcon className='fontAwesomeIcon' icon={faCirclePlay} /></button>
        <button className='btn' id='start_stop' style={BtnStyle} onClick={pauseTimer}><FontAwesomeIcon className='fontAwesomeIcon' icon={faCirclePause} /></button>
        <button className='btn' id='reset' style={BtnStyle} onClick={resetTimer}><FontAwesomeIcon className='fontAwesomeIcon' icon={faRotateRight} /></button>
        </div>
        
    </div>
  )
;
};

export default insideSession;
