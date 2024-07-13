/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect , useCallback } from 'react';

const useTimer = (initialSessionMinutes, initialSessionSeconds, initialBreakMinutes, initialBreakSeconds, resetBreak, resetSession) => {
  const [minutes, setMinutes] = useState(initialSessionMinutes);
  const [seconds, setSeconds] = useState(initialSessionSeconds);
  const [isSession, setIsSession] = useState(true);
  const timerInterval = useRef(null);

  //const [isPaused ,setIsPaused] = useState(false);

  const isWarning = minutes === 0 && seconds <= 59;
  const playAudio = () => {
    const isAudio = document.getElementById('beep');
    isAudio.play();
   }
   const stopAudio = () => {
     const audioElement = document.getElementById('beep');
     audioElement.pause();
     audioElement.currentTime = 0; // Reset playback to the start
   };

  const sessionTimer = useCallback(() => {
    if (timerInterval.current!== null) return;  // Prevent multiple intervals
    timerInterval.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) return prevSeconds - 1;
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              clearInterval(timerInterval.current);
              timerInterval.current = null;
              playAudio();
              // logic that handle the transition between Session and Break
              setIsSession((prevIsSession) => {
                const newIsSession = !prevIsSession;
                if(newIsSession) {
                  setMinutes(initialSessionMinutes);
                  setSeconds(initialSessionSeconds);
                } else {
                  setMinutes(initialBreakMinutes);
                  setSeconds(initialBreakSeconds);
                }
                sessionTimer();
                return newIsSession;
              })
              return 0;
            }
            return prevMinutes - 1;
          });
          return 59;
        }
        return prevSeconds;
      });
    }, 1000);
  }, [initialSessionMinutes, initialSessionSeconds, initialBreakMinutes,initialBreakSeconds]);

  const pauseTimer = useCallback(() => {
      clearInterval(timerInterval.current);
    timerInterval.current = null;
  }, []);
  
  const resetTimer = useCallback(() => {
    setMinutes(initialSessionMinutes);
    setSeconds(initialSessionSeconds);
    clearInterval(timerInterval.current);
    setIsSession(true);
    timerInterval.current = null;
    stopAudio();
    resetBreak();
    resetSession();
  }, [initialSessionMinutes, initialSessionSeconds, resetSession, resetBreak]);

  useEffect(() => {
    setMinutes(initialSessionMinutes);
    setSeconds(initialSessionSeconds);
    clearInterval(timerInterval.current);
    timerInterval.current = null;
  }, [initialSessionMinutes, initialSessionSeconds]);

 
  return { minutes, seconds,isSession, isWarning, sessionTimer,  pauseTimer, resetTimer };
};

export default useTimer;
