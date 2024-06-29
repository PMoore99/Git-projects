import React from "react";
import styles from "./DisplayAlbum.module.css";
import add from "./images/add.png";
import Track from "./Track";

export default function DisplayAlbum(props) {
  try {
    console.log(props);
    const tracks = props.displayedTracks;  
    return (
      <div className={styles.results}>
        {tracks.map((track, index) => {
          return (
            <div className={styles.trackContainer} key={"container" + index}>
              <Track track={track} key={track.id + index}/>
              <button type="submit" className={styles.addToPlayListBtn} onClick={props.onAddPlaylist} name={track.id} key={"name" + index}><img src={add} alt="add.png" key={"img" + index } /></button>
            </div>
          )
        })}
        <div className={styles.addAll} onClick={props.onClickAddAll}>Add all to playlist &nbsp;{<img src={add} alt="add.png" />}</div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }

}