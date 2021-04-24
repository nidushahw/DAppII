import React from 'react';
import PropTypes from 'prop-types';

function Post(props) {
  let image = {
    width: '60px',
    height: '60px',
    float: 'left',
    padding: '0 2px 0 2px',
    marginTop: '15px',
    marginLeft: '10px'
  }
  let text = {
    paddingLeft: '10px',
    marginTop: '-10px'
  }
  let border={
    border: '1px solid lightgray',
    display: 'grid',
    gridTemplateColumns: '1fr 4fr'
  }
  let name={
    marginLeft: '10px',
    
  }
  return (
    <div style={border}>
      <img style={image} src={props.img} alt='post'/>
      <div>
        <p style={name}><strong>{props.name}</strong></p>
        <p style={text}>{props.text}</p>
      </div>
    </div>
  );
}

Post.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string
}

export default Post;