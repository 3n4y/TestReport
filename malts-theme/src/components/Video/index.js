import React from 'react';
import YouTube from 'react-youtube-embed';

const Video = ({ videoUrl }) => (
  <YouTube id={videoUrl} appendSrc="?rel=0&modestbranding=1" />
);

export default Video;
