import React from 'react';

export default function SearchBar(props) {  
  return (
    <>      
      <input type='text' value={props.searchTerm} onChange={props.onChange} style={{ width: "10rem" }}/>
      <input type='submit' value='Search By Artist' onClick={props.onClick}/>      
    </>
  )
}