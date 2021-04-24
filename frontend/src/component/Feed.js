import React from 'react';
import SearchFeed from './SearchFeed';
import Post from './Post';

function Feed() {
  let container = {
    border: '2px solid lightgray',
    width: '300px'
  }
  return (
    <div style={container}>
      <SearchFeed />
      <Post
        img="profile.png"
        name="Me"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nullam" />
      <Post
        img="friend.png"
        name="Dude"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nullam" />
      <Post
        img="friend.png"
        name="Lorem Ipsum"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nullam" />
      <Post
        img="friend.png"
        name="Lorem Ipsum"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nullam" />
      <Post
        img="friend.png"
        name="Lorem Ipsum"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nullam" />
    </div>
  );
}

export default Feed;