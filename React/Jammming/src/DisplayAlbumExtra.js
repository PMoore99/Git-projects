import React from "react";
import styles from "./DisplayAlbumExtra.module.css";

export default function DisplayAlbumExtra(props) {
  try {
    console.log(props);
    const albumImageSrc = props.albumDetails.images[1].url;
    return (
      <div className={styles.infoContainer}>
        <p onClick={props.onClickBack} className={styles.return}>Return to album search</p>
        <div className={styles.imagesContainer}>
          <img src={props.artistPic} className={styles.img1} />
          <img src={albumImageSrc} alt={props.albumDetails.name} className={styles.img2} />
        </div>
      </div>
    )
  }
  catch (error) {
    console.log(error);
  }
}