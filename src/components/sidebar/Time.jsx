import { React, useState, useEffect } from 'react';

const Time = () => {
  let time = new Date().toLocaleTimeString();
  let now = new Date();
  let hrs = now.getHours();

  const [currentTime, setCurrentTime] = useState(time);
  const [isAMPM, setIsAMPM] = useState('');

  const updateGreeting = () => {
    let greeting = '';
    if (hrs < 12)
        greeting = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greeting = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greeting = 'Good Evening';
    setIsAMPM(greeting);
  };

  useEffect(()=>{
    updateGreeting();
  });

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(updateTime, 1000);

  return (
    <div>
      <span className='greetings'>{isAMPM}</span>
      <br/>
      {currentTime}
    </div>
  );
};

export default Time;
