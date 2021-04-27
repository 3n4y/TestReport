import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import styles from './title-component.module.scss';

const TitleComponent = ({ data }) => (
  <Container
    className={`componentWrapper ${data.className ? data.className : ''}`}
  >
    <Container className={`p-2 pt-0 ${styles.titleComponent}`}>
      <Row>
        <Col>
          <h2 className="text-center">{data.Title}</h2>
          <p className="text-center normalcase">
            <ReactMarkdown source={data.Subtitle} />
          </p>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default TitleComponent;
