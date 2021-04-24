import React from 'react';
import Friend from './Friend';

function FriendList() {
  let container = {
    border: '2px solid lightgray',
    paddingLeft: '15px',
    color: '#777777'
  }
  return (
    <div style={container}>
      <br/>
      <h4>Friend Requests</h4>
      <br />
      <Friend
        img="friend.png"
        text="John Doe" />
      <Friend
        img="friend.png"
        text="Ian Fleming" />
      <Friend
        img="friend.png"
        text="Jane Doe" />
    </div>
  );
}

export default FriendList;