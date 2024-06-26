import React from "react";
import styles from "./SearchBar.module.css";
import vynil from "./images/vynil.png"

export default function SearchBar(props) {
  console.log(props);
  return (
    <form className={styles.searchBarContainer} onSubmit={props.onSubmit} name="searchBy" >
      <input type="text" name="searchBy" className={styles.search} value={props.searchTerm} onChange={props.onChange} />
      <button type="submit" name="searchBy" className={styles.searchBtn} ><img src={vynil} alt="vynil.png" /></button>

      <div className={styles.radioButtonContainer} >
        <div className={styles.radioButton}>
          <input type="radio" className={styles.radioButtonInput} id="radio1-1" name="searchBy" />
          <label className={styles.radioButtonLabel} htmlFor="radio1-1">
            <span className={styles.radioButtonCustom}></span>
            Search By Artist / Album
          </label>
        </div>

        <div className={styles.radioButton}>
          <input type="radio" className={styles.radioButtonInput} id="radio2-1" name="searchBy" />
          <label className={styles.radioButtonLabel} htmlFor="radio2-1">
            <span className={styles.radioButtonCustom}></span>
            Search By track Title
          </label>
        </div>
      </div>
    </form>
  )
}