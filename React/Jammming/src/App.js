import React, { useEffect, useState, useRef, useMemo } from "react";
import { ids } from "./SpotifyKeys";
import LoginToSpotify from "./LoginToSpotify";
import Header from "./Header";
import SearchAlbums from "./SearchAlbums";
import DisplayAlbum from "./DisplayAlbum";
import DisplayAlbumExtra from "./DisplayAlbumExtra";
import Tracklist from "./Tracklist";
import Playlist from "./Playlist";
import PlaylistUpload from "./PlaylistUpload";

function App() {
  const clientId = ids.clientId;
  const spotifyApi = "https://api.spotify.com/v1/";
  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [artistImageUrl, setArtistImageUrl] = useState("");
  const [albums, setAlbums] = useState([]);
  const [clickedAlbum, setClickedAlbum] = useState("");
  const [albumDetails, setAlbumDetails] = useState({});
  const [displayedTracks, setDisplayedTracks] = useState([]);
  const [toggleComponents, setToggleComponents] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [playlistUploadString, setPlaylistUploadString] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const tokenFlag = useRef(false);

  useEffect(() => {
    const oldToken = window.localStorage.getItem("token");
    if (window.location.href.match("http://localhost:3000/#access_token")) {
      const newToken = window.location.href.match(/=([^&]*)/)[1];
      window.localStorage.setItem("token", newToken);
      setAccessToken(newToken);
    } else if (!oldToken || window.location.href === "http://localhost:3000/") {
      tokenFlag.current = true;
    }
    else {
      setAccessToken(oldToken);
    }
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("playlist") !== null) {
      setPlaylist(JSON.parse(window.localStorage.getItem("playlist")));
    }
  }, []);

  const handleSearchTerm = e => {
    e.preventDefault();
    console.log(e)
    setSearchTerm(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    if (toggleComponents === "albumInfo") {
      setToggleComponents("albums");
    }    
    if (e.target[2].checked === true) {
      searchArtist();
    } else if (e.target[3].checked === true) {
      searchTracks();
    } else {
      alert("Please click on one of the radio buttons.");
    }
  }

  const handleBack = e => {
    e.preventDefault();
    setToggleComponents("albums");
  }

  const searchParams = useMemo(() => {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }
  }, [accessToken]);

  const searchArtist = async () => {
    const getArtistId = await fetch(`${spotifyApi}search?q=${searchTerm}&type=artist`, searchParams)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        try {
          tokenFlag.current = false;
          setArtistImageUrl(data.artists.items[0].images[1].url);
          return data.artists.items[0].id;
        }
        catch (error) {
          console.log(error);
          tokenFlag.current = true;
        }
      })

    const getAlbums = await fetch(`${spotifyApi}artists/${getArtistId}/albums?limit=50&market=gb`, searchParams)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        try {
          tokenFlag.current = false;
          const unsortedAlbums = data.items;
          const sortedAlbums = unsortedAlbums.sort((a, b) => {
            if (a.release_date !== undefined && b.release_date !== undefined) {
              return a.release_date > b.release_date ? 1 : -1;
            } else {
              return a.release_date !== undefined ? 1 : -1
            }
          });
          setToggleComponents("albums");
          return sortedAlbums;
        } catch (error) {
          console.log(error);
          tokenFlag.current = true;
        }
      })
    setAlbums(getAlbums);
  }

  const handleAlbumClick = e => {
    console.log(e);
    e.preventDefault();
    e.persist();
    if (e.target.name) 
      {setClickedAlbum(e.target.name);}
    else if (e.target.attributes[2].value)
       {setClickedAlbum(e.target.attributes[2].value);}
    else console.log("Help!!!")
  }

  useEffect(() => {
    (async () => {
      if (clickedAlbum) {
        await fetch(`${spotifyApi}albums/${clickedAlbum}?market=gb`, searchParams)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            try {
              tokenFlag.current = false;
              setAlbumDetails(data);
              setDisplayedTracks(data.tracks.items);
              setToggleComponents("albumInfo");
            }
            catch (error) {
              console.log(error);
              if (error.staus < 500) {
                tokenFlag.current = true;
              } else {
                alert("Spotify server error!")
              }
            }
          })
      }
    })();
  }, [clickedAlbum, searchParams])

  console.log(albumDetails);

  const searchTracks = async () => {
    const getTracks = await fetch(`${spotifyApi}search?q=${searchTerm}&type=track&limit=30&market=gb`, searchParams)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        try {
          tokenFlag.current = false;
          setToggleComponents("tracks");
          return data.tracks.items;
        }
        catch (error) {
          console.log(error);
          tokenFlag.current = true;
        }
      })
    setDisplayedTracks(getTracks);
  }

  const addToPlaylist = e => {
    if (e.target.parentNode.name) {
      const trackId = e.target.parentNode.name;
      let trackArray = [];
      if (toggleComponents === "albumInfo") {
        trackArray = albumDetails.tracks.items.filter(track => track.id === trackId);
      } else {
        trackArray = displayedTracks.filter(track => track.id === trackId);
      }
      const trackObject = trackArray[0];
      const currentPlaylist = playlist;
      if (currentPlaylist.length > 0) {
        setPlaylist([...currentPlaylist, trackObject]);                
      } else {
        setPlaylist([trackObject]);        
      }
    } else {
      console.log("Error!");
    }    
  }

  const handleClearPlaylist = () => {
    window.localStorage.setItem("playlist", JSON.stringify([]));
    setPlaylist([]);
  }

  const handleAddAll = () => {
    const currentPlaylist = playlist;
    displayedTracks.map(track => currentPlaylist.push(track));
    setPlaylist(currentPlaylist);    
  }

  const handleRemove = e => {
    const trackId = e.target.parentNode.name;
    const newPlaylist = playlist.filter(track => track.id !== trackId);
    setPlaylist(newPlaylist);
  }

  const handlePlaylistName = e => {
    e.preventDefault();
    setPlaylistName(e.target.value);
  }

  const handlePlaylistDescription = e => {
    e.preventDefault();
    setPlaylistDescription(e.target.value);
  }

  useEffect(() => {
    if (playlist.length > 0) {
      console.log(playlist);
      const trackIds = playlist.map(track => track.id);
      const trackString = trackIds.join(",spotify:track:");
      console.log(trackString);
      setPlaylistUploadString(trackString);
    }
  }, [playlist])

  const handlePlaylistUpload = async e => {
    e.preventDefault();
    console.log(e);
    if (e.target[3].checked === true) {
      setIsPublic(false);
    } else if (e.target[4].checked === true) {
      setIsPublic(true);
    }

    const createOnServerParams = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + accessToken
      },
      body: btoa(JSON.stringify(
        {
          "name": playlistName,
          "description": playlistDescription,
          "public": isPublic
        }))
    };

    const createOnServer = await fetch(`${spotifyApi}users/${clientId}/playlists`, createOnServerParams)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        try {
          if (data.error) {
            console.log("Whoops!");
          } else {
            return data.id;
          }
        }
        catch (error) {
          console.log(error);
        }
      });
    setPlaylistId(createOnServer);

    const uploadPlaylist = async () => {
      await fetch(`${spotifyApi}playlists/${playlistId}/tracks?uris=spotify:track:${playlistUploadString}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          try {
            if (data.error) {
              console.log("Whoops again!");
            } else {
              alert("Upload successful!");
            }
          }
          catch (error) {
            alert("Oh no!")
            console.log(error);
          }
        });
    }
    uploadPlaylist();
  }

  console.log(playlist);

  useEffect(() => {
    if (playlist.length > 0) {
      window.localStorage.setItem("playlist", JSON.stringify(playlist));
    }
  }, [playlist])

  return (!window.location.hash || tokenFlag.current === true) ? (
    <LoginToSpotify />
  ) : (
    <>
      <div id="header">
        <Header onChange={handleSearchTerm} searchTerm={searchTerm} onSubmit={handleSubmit} />
        {toggleComponents === "albumInfo" ? <DisplayAlbumExtra artistPic={artistImageUrl} albumDetails={albumDetails} onClickBack={handleBack} />
          : <></>}
      </div>
      <div id="content">
        {toggleComponents === "albums" ? <SearchAlbums onClick={handleAlbumClick} albums={albums} />
          : <></>}
        {toggleComponents === "albumInfo" ? <DisplayAlbum onClickAddAll={handleAddAll} onAddPlaylist={addToPlaylist} albumDetails={albumDetails} />
          : <></>}
        {toggleComponents === "tracks" ? <Tracklist displayedTracks={displayedTracks} onAddPlaylist={addToPlaylist} />
          : <></>}
        {playlist.length === 0 ? <></> : <Playlist playlist={playlist} onClickClear={handleClearPlaylist} onClickRemove={handleRemove} />}
      </div>
      <div id="footer">
        <PlaylistUpload playlistName={playlistName} playlistDescription={playlistDescription} onSubmit={handlePlaylistUpload} onNaming={handlePlaylistName} onDescription={handlePlaylistDescription} />
      </div>
    </>
  );
}

export default App;
