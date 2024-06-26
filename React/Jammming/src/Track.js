import React from "react";
import styles from "./Track.module.css";

export default function Track(props) {
  const track = props.track;
  const minutes = Math.floor(track.duration_ms / 60000);
  const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
  const time = minutes + "m : " + (seconds < 10 ? '0' : '') + seconds + "s";
  return (
    <>
      <p className={styles.name} name={track.id}>{track.name}</p>
      <p className={styles.year} name={track.id}>&nbsp;&nbsp;&nbsp;{time}</p>
    </>
  )
}
