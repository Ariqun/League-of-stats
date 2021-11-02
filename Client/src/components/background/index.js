import React from 'react';

const Background = () => (
  <video id="video_back" preload="auto" autoPlay loop muted="muted">
    <source src={`${process.env.PUBLIC_URL}/assets/video/diana.webm`} type='video/webm; codecs="vp8, vorbis"' />
  </video>
);

export default Background;
