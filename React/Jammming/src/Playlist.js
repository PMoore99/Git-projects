import React from "react";
import styles from "./Playlist.module.css";
import minus from "./images/minus.png";
import Track from "./Track";

export default function Playlist(props) {
  console.log(props);
  const tracks = props.playlist;
  return (
    <div className={styles.results}>
      {tracks.map((track, index) => {
        return (
          <div className={styles.trackContainer} key={index}>
            <Track track={track} key={track.id}/>
            <p className={styles.artistName} key={"artist" + index}>&nbsp;{track.artists[0].name}</p>
            <button type="submit" className={styles.minusToPlayListBtn} onClick={props.onClickRemove} name={track.id} key={"minus" + track.id}><img src={minus} alt="minus.png" key={"img" + { index }} /></button>
          </div>
        )
      })}
      <div className={styles.clearAll} onClick={props.onClickClear}>Clear all from playlist &nbsp;{<img src={minus} alt="minus.png" />}</div>
    </div>
  )
}