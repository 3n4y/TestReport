import React from 'react';
import { Container } from 'react-bootstrap';
/**
 *
 * Height should be set to 450 width to 100%
 * '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2190.5774176254276!2d-3.723819784447208!3d56.69869212610974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488602c7e60c5239%3A0xbf4edf270be842d1!2sBlair%20Athol%20Distillery!5e0!3m2!1sen!2sca!4v1591234949001!5m2!1sen!2sca" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
 * @param {*} data
 */
const GoogleMapComponent = ({ data }) => (
  <>
    <Container fluid>
      <div dangerouslySetInnerHTML={{ __html: data.embed }} />
    </Container>
  </>
);

export default GoogleMapComponent;
