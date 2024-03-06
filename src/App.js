import React, { useState, useRef } from 'react'
import './App.css'

const GestureVideoPlayer = () => {
  const [totalTime, setTotalTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const video = useRef(null)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      video.current.pause()
    } else {
      video.current.play()
    }
  };

  const LoadedData = () => {
    setTotalTime(video.current.duration)
  };

  const TimeUpdate = () => {
    setElapsedTime(video.current.currentTime)
  };

  const DoubleTapEvent = (e) => {
    const videoElement = e.target.getBoundingClientRect()
    const x  = e.clientX - videoElement.left
    const videoWidth = video.current.clientWidth

    if ( x  < videoWidth / 3) {
      handleRewind();
    } else if ( x  > videoWidth * (2 / 3)) {
      handleForward()
    } else {
      handlePlayPause()
    }
  };

  const handleRewind = () => {
    video.current.currentTime -= 10
  };

  const handleForward = () => {
    video.current.currentTime += 10
  };

  return (
    <div className="container">
      <video ref={video}
      src="/video/SaveTube.io-The Himalayas.mp4" 
      controls={false} 
      onLoadedData={LoadedData} 
      onTimeUpdate={TimeUpdate} 
      onDoubleClick={DoubleTapEvent} />
        <div className='display-time'>
          {Math.floor(elapsedTime / 60)}:{Math.floor(elapsedTime % 60).toString().padStart(2, '0')} /{' '}
          {Math.floor(totalTime / 60)}:{Math.floor(totalTime % 60).toString().padStart(2, '0')}
        </div>
        <div className={`play-pause ${isPlaying ? 'playing' : 'paused'}`} >
          {isPlaying ? 'Pause' : 'Play'}
        </div>
    </div>
  );
};

export default GestureVideoPlayer;