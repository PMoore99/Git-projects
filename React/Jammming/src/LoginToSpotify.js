import React from "react";
import { ids } from "./SpotifyKeys";
import styles from "./LoginToSpotify.module.css";

const clientId = ids.clientId;
const redirect = "http://localhost:3000/";
const authEnd = "https://accounts.spotify.com/authorize?";

const loginEndpoint = `${authEnd}client_id=${clientId}&response_type=token&redirect_uri=${redirect}&scope=playlist-modify-private%20playlist-modify-public%20user-modify-playback-state%20streaming`;

export default function LoginToSpotify() {
  return (
    <div className={styles.loginContainer}>
      <a href={loginEndpoint} className={styles.loginBtn}>Login to Spotify</a>
    </div>
  );
}