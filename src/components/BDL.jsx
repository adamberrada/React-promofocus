import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';*/
function insideclock({
    minBreak,
    maxBreak,
    breakLength,
    maxSession,
    minSession,
    sessionLength,
    theme
        }) {

   const BtnStyle = {
    height: '20px',
    backgroundColor: theme.buttonColor
   }
   const labelStyle ={
    color: theme.buttonTextColor
   }
   const spanStyle = {
    color: 'white'
   }

    return(
       <div className="break-and-session-label">
            <div className="label-container" id="break-label" >
                <label style={labelStyle}>Break Length</label>
                <div>
                <button className="btn"  style={BtnStyle}id="break-decrement" onClick={minBreak}><FontAwesomeIcon className="fon" icon={faArrowDown} /></button>
                <span style={spanStyle} id="break-length">{breakLength}</span>
                <button className="btn" style={BtnStyle} id="break-increment" onClick={maxBreak}><FontAwesomeIcon icon={faArrowUp} /></button>   
                </div>
                
            </div>
            <div className="label-container" id="session-label">
                <label style={labelStyle}>Session Length</label>
                <div>
                <button className="btn" style={BtnStyle} id="session-decrement" onClick={minSession} ><FontAwesomeIcon icon={faArrowDown} /></button>
                <span style={spanStyle} id="session-length">{sessionLength}</span>
                <button className="btn" style={BtnStyle} id="session-increment" onClick={maxSession}><FontAwesomeIcon icon={faArrowUp} /></button>
            </div>
            </div>
       </div>
)}
export default insideclock;