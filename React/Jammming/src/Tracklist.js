import React from "react";
import styles from "./Tracklist.module.css";
import add from "./images/add.png";
import Track from "./Track";

export default function Tracklist(props) {
  console.log(props);
  const tracks = props.displayedTracks;
  return (
    <div className={styles.results}>
      {tracks.map((track, index) => {
        const isoDate = track.album.release_date.slice(0, 4);
        return (
          <div className={styles.trackContainer}>
            <img src={track.album.images[2].url} alt={track.album.name} className={styles.pic} key={"image" + index}/>
            <Track track={track} key={track.id + index}/>
            <p className={styles.artistName} key={"artist" + index}>{track.artists[0].name} {isoDate}</p>
            <button type="submit" className={styles.addToPlayListBtn} onClick={props.onAddPlaylist} name={track.id} key={"button" + index}><img src={add} alt="add.png" key={"btnImage" + index}/></button>
          </div>
        )
      })}
    </div>
  );
}