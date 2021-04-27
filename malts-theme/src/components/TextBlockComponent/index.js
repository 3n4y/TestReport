import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const TextBlockComponent = ({ data }) => (
  <Container>
    <Row>
      <Col>
        <h1 className="withwings text-center">{ data.title }</h1>
        <ReactMarkdown source={data.text} />
      </Col>
    </Row>
  </Container>
);

export default TextBlockComponent;
