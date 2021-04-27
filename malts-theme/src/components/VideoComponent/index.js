import React from 'react';
import { Container } from 'react-bootstrap';
import TitleComponent from '../TitleComponent';
import Video from '../Video';
import styles from './video-component.module.scss';

const VideoComponent = ({ data }) => (
  <Container fluid className={`${data.className ?? ''} d-flex flex-column justify-content-center align-items-center`}>
    { data.title_block != null
      ? <TitleComponent data={data.title_block} />
      : null}
    <div className={`page-width ${styles.videoContainer}`}>
      <Video videoUrl={data.video_url} />
    </div>
  </Container>
);

export default VideoComponent;
