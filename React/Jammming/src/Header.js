import React from "react";
import styles from "./Header.module.css";
import minus from "./images/minus.png";
import add from "./images/add.png";
import SearchBar from "./SearchBar";

export default function Header(props) {  
  const onChange = props.onChange;
  const searchTerm = props.searchTerm;
  const onSubmit = props.onSubmit;
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>Jammming</h1>
      <h3>Search for tracks and create playlists on Spotify</h3>
      <SearchBar onChange={onChange} searchTerm={searchTerm} onSubmit={onSubmit}/>
      <h5 className={styles.explain}>Click &nbsp;{<img src={add} alt="add.png" />} / {<img src={minus} alt="minus.png" />}&nbsp; to add and delete tracks from playlist</h5>
    </div>
  )
}
