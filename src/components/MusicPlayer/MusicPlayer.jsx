import React, { useEffect, useRef, useState } from 'react';
import styles from './MusicPlayer.module.css';
import profliecard from '../../assets/profliecard.png';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const MusicPlayer = ({ data }) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  //references
  const audioPlayer = useRef(); // refrence our audio player components
  const progressBar = useRef(); // refrence our progress bar
  const animationRef = useRef(); // refrence our animation for progressbar

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      `--seek-before-width`,
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handlingRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={profliecard} alt="profliecard" />
        <div className={styles.info}>
          <h3>Song name</h3>
          <p>Album name</p>
        </div>
      </div>
      <div className={styles.audioPlayer}>
        <audio
          ref={audioPlayer}
          src="https://dns6.pendusaab.com/m4a/34297/1034685/Shri-Ram-Janki-Lakhbir-Singh-Lakha.m4a"
        />
        <div className={styles.wrapper}>
          <button onClick={togglePlayPause} className={styles.playPause}>
            {isPlaying ? (
              <PauseCircleIcon className={styles.icon} />
            ) : (
              <PlayCircleIcon className={styles.icon} />
            )}
          </button>
        </div>

        <div className={styles.progress}>
          {/* cureent time */}
          <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

          {/* progress bar */}
          <div>
            <input
              ref={progressBar}
              type="range"
              defaultValue="0"
              className={styles.progressbar}
              onChange={handlingRange}
            />
          </div>

          {/* duration time */}
          <div className={styles.duration}>
            {duration && !isNaN(duration) && calculateTime(duration)}
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default MusicPlayer;
