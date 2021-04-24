import React from 'react';
import PropTypes from "prop-types";

function Friend(props){
  let image = {
    width: '65x',
    height: '65px',
    marginRight: '15px'
  }
  let buttonStyle={
    backgroundColor: '#0275d8',
    padding: '3px 25px 3px 25px',
    color: 'white',
    marginTop: '-10px',
    marginBottom: '5px',
    borderRadius: '4px'
  }
  let columns = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    marginBottom: '5px'
  }
  let raised={
    marginTop: '-5px'
  }

  return(
    <div style={columns}>
      <div>
        <img style={image} src={props.img} alt='friend'/>
      </div>
      <div style={raised}>
        <p>{props.text}</p>
        <button style={buttonStyle}>Connect</button>
      </div>
    </div>
  );
}

Friend.propTypes={
  img: PropTypes.string,
  text: PropTypes.string
};

export default Friend;