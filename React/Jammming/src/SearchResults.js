import React from "react";

export default function SearchResults(props) {
  return (
    props.albums.map((album, index) => {
      return (
      <div className="">
        <p>{album.name}</p>
        <img src={album.images[2].url} key={index} alt={album.name} />
      </div>
      )
    })
  )
}