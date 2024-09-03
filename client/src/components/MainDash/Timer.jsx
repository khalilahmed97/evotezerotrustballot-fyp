import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState({
  hours: 8,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  useEffect(() => {
    // Get the stored end time from localStorage
    const savedEndTime = localStorage.getItem('endTime');

    if (savedEndTime) {
      const endTime = new Date(savedEndTime);
      updateRemainingTime(endTime);
    } else {
      // If there's no stored end time, set the new end time
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + 8);
      localStorage.setItem('endTime', endTime.toISOString());
      updateRemainingTime(endTime);
    }

    const myInterval = setInterval(() => {
      const endTime = new Date(localStorage.getItem('endTime'));
      updateRemainingTime(endTime);
    }, 10);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const updateRemainingTime = (endTime) => {
    const now = new Date();
    const timeDifference = endTime - now;

    if (timeDifference <= 0) {
      setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
      localStorage.removeItem('endTime');
    } else {
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);
      const milliseconds = Math.floor((timeDifference % 1000) / 10);

      setTime({ hours, minutes, seconds, milliseconds });
    }
  };

  const { hours, minutes, seconds, milliseconds } = time;

  return (
    <div className="card" style={{ backgroundColor: '#135498', width: "85%", height: "85px", color: "#F9F5FF", borderRadius: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div>
          <h1>{hours}</h1>
          <p>Hours</p>
        </div>
        <div className="single-box">
          <h1>{minutes}</h1>
          <p>Minutes</p>
        </div>
        <div className="single-box">
          <h1>{seconds}</h1>
          <p>Seconds</p>
        </div>
        <div className="single-box">
          <h1>{milliseconds}</h1>
          <p>Milliseconds</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;