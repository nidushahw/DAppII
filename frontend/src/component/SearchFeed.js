import React from 'react';

function SearchFeed() {
  let buttonStyle = {
    width: '30px',
    height: '30px',
    margin: '20px 30px 0px 5px',
    float: 'right',
    backgroundColor: '#5bc0de',
    borderRadius: '4px'
  }
  let inputStyle = {
    height: '30px',
    width: '210px',
    margin: '20px 10px 5px 5px',
    border: '2px solid #00ddff'
  }
  let divStyle = {
    backgroundColor: 'lightblue',
    paddingBottom: '20px'
  }
  return (
    <div style={divStyle}>
      <input style={inputStyle} type="text" placeholder="What's happening?"/>
      <button style={buttonStyle}></button>
    </div>
  );
}

export default SearchFeed;

