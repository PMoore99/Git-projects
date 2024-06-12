import React, { useEffect, useState } from 'react';
import LoginToSpotify from './LoginToSpotify';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Tracklist from './Tracklist';
import Track from './Track';
import Playlist from './Playlist';

function App() {
  const spotifyApi = "https://api.spotify.com/v1/";
  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [albums, setAlbums] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    const oldToken = window.localStorage.getItem("token");
    console.log(oldToken)
    if (!oldToken || window.location.href !== 'http://localhost:3000/') {
      const newToken = window.location.href.match(/=([^&]*)/)[1];
      console.log(newToken)
      window.localStorage.setItem("token", newToken);
      setAccessToken(newToken);
    } else if (window.location.href === 'http://localhost:3000/') {
      LoginToSpotify();
    }
    else {
      setAccessToken(oldToken);
    }
  }, []);

  const searchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  };

  const searchArtist = async () => {
    const getArtistId = await fetch(`${spotifyApi}search?q=${searchTerm}&type=artist`, searchParams)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        try {
          return data.artists.items[0].id;
        }
        catch (error) {
          console.log(error);
          LoginToSpotify();
        }
      })

    const getAlbums = await fetch(`${spotifyApi}artists/${getArtistId}/albums?limit=50&market=uk`, searchParams)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data.items;
      })
    setAlbums(getAlbums);
  }

  return !window.location.hash ? (
    <LoginToSpotify />
  ) : (
    <>
      <SearchBar onChange={handleChange} searchTerm={searchTerm} onClick={searchArtist} />
      <SearchResults albums={albums} />
      <Tracklist />
      <Track />
      <Playlist />
    </>
  );
}

export default App;
