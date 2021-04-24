import React from 'react';

function Badge() {
  let image = {
    width: '75px',
    border: '2px solid white',
    borderRadius: '30px',
    marginTop: '-60px'
  }
  let blue = {
    backgroundColor: '#34abef',
    height: '92px'
  }
  let container = {
    width: '300px'
  }
  let nameFloat = {
    float: 'left',
    marginBottom: '5px',
    color: '#333333'
  }
  let paddingAll = {
    padding: '0 20px 0 20px',
    border: '2px solid lightgray'
  }
  let wordsColor = {
    color: 'gray',
    marginBottom: '2px',
  }
  return (
    <div style={container}>
      <div style={blue}>

      </div>
      <div style={paddingAll}>
        <img style={image} src="profile.png" alt='profile'/>
        <h3 style={nameFloat}>Nidusha Lakmali</h3>
        <p style={wordsColor}>Following 10</p>
        <p style={wordsColor}>Followers 120</p>
        <br />
      </div>
    </div>
  );
}

export default Badge;