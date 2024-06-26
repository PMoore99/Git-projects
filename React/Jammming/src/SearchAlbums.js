import React from "react";
import styles from "./SearchAlbums.module.css";

export default function SearchAlbums(props) {
  console.log(props);
  return (
    <div className={styles.results}>
      {props.albums.map((album, index) => {
        const isoDate = album.release_date.slice(0, 4);

        return (
          <div className={styles.albumContainer} key={"cont" + index} name={album.id} onClick={props.onClick} value={album.id}>
            <img className={styles.pic} src={album.images[2].url} key={"pic" + index} alt={album.name} name={album.id} value={album.id}/>
            <p className={styles.name} key={"album" + index} name={album.id} value={album.id}>&nbsp;&nbsp;&nbsp;{album.name}</p>            
            <p className={styles.year} key={"date" + index} name={album.id} value={album.id}>&nbsp;&nbsp;&nbsp;Released: {isoDate}</p>
          </div>
        )
      })}
    </div>
  )
}