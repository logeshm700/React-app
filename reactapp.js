
import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);

    const lastTrackIndex = parseInt(localStorage.getItem('currentTrackIndex')) || 0;
    setCurrentTrackIndex(lastTrackIndex);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('currentTrackIndex', currentTrackIndex.toString());
  }, [playlist, currentTrackIndex]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newPlaylist = [...playlist, ...files];
      setPlaylist(newPlaylist);
    }
  };

  const handlePlay = () => {
    if (playlist.length > 0) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <div>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleNext}>Next</button>
      <audio ref={audioRef} controls>
        <source src={playlist[currentTrackIndex] && URL.createObjectURL(playlist[currentTrackIndex])} />
      </audio>
      <ul>
        {playlist.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AudioPlayer />
    </div>
  );
}

export default App;
