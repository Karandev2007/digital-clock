import React, { useState, useEffect } from 'react';
import './styles/globals.css';

const App = () => {
  const [time, setTime] = useState(new Date()); // for storing current time
  const [selectedZone, setSelectedZone] = useState('India'); // default is ist
  const [timeString, setTimeString] = useState('');

  const timeZones = {
    India: 'Asia/Kolkata',
    'New York': 'America/New_York',
    London: 'Europe/London',
  };

  // auto updater for time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  useEffect(() => {
    // update the time string whenever the time or selected time zone changes
    setTimeString(getTimeForZone(timeZones[selectedZone]));
  }, [time, selectedZone]);

  const getTimeForZone = (timeZone) => {
    // handle timezone conversion
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone });
    return formatter.format(time);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">

      <div className="mb-6">
        <img src="https://cdn-icons-png.flaticon.com/512/4305/4305432.png" alt="Clock GIF" className="w-64 h-64" />
      </div>

      <h1 className="text-5xl font-bold mb-6">Digital Clock</h1>

      {/* time zone dropdown */}
      <select
        value={selectedZone}
        onChange={(e) => setSelectedZone(e.target.value)} // cont updates selected time zone
        className="p-2 mb-6 bg-gray-800 text-white rounded-md"
      >
        {Object.keys(timeZones).map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      {/* displays time */}
      <div className="text-6xl font-mono mb-6">
        <h2>{selectedZone}: {timeString}</h2>
      </div>
    </div>
  );
};

export default App;
