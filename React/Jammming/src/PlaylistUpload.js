import React from "react";
import styles from "./PlaylistUpload.module.css";
import upload from "./images/up-loading.png";

export default function PlaylistUpload(props) {
  console.log(props);
  return (
    <form className={styles.uploadContainer} onSubmit={props.onSubmit} name="uploadPlaylist" >
      <label htmlFor="name" className={styles.label}>Playlist Name: </label>
      <input type="text" name="uploadPlaylist" id="name" className={styles.upload} value={props.playlistName} onChange={props.onNaming} />
      <label htmlFor="description" className={styles.label}>Description: </label>
      <input type="text" name="uploadPlaylist" id="description" className={styles.upload} value={props.playlistDescription} onChange={props.onDescription} />
      <button type="submit" name="uploadPlaylist" className={styles.uploadBtn} ><img src={upload} alt="up-loading.png" /></button>

      <div className={styles.radioButtonContainer}>
        <div className={styles.radioButton}>
          <input type="radio" className={styles.radioButtonInput} id="radio1-2" name="uploadPlaylist" defaultChecked />
          <label className={styles.radioButtonLabel} htmlFor="radio1-2">
            <span className={styles.radioButtonCustom}></span>
            Private
          </label>
        </div>

        <div className={styles.radioButton}>
          <input type="radio" className={styles.radioButtonInput} id="radio2-2" name="uploadPlaylist" />
          <label className={styles.radioButtonLabel} htmlFor="radio2-2" >
            <span className={styles.radioButtonCustom}></span>
            Public
          </label>
        </div>
      </div>
    </form>
  )
}



