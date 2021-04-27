import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDataLayer, threediumShow } from 'malts-theme/src/utils/dataLayer/index';
import styles from './threedium-view.module.scss';

const ThreediumView = ({ product }) => {
  const [showThreedium, setShowThreedium] = useState(false);
  const [dataLayerShowThreedium] = useDataLayer([threediumShow]);

  const handleShowThreedium = () => {
    setShowThreedium(true);
    dataLayerShowThreedium(product.title);
  };

  if (product.threedium_url) {
    return (
      <>
        <Button
          className="btn btn-primary threedium"
          onClick={() => handleShowThreedium(true)}
        >
          Exclusive 3D View
        </Button>
        <Modal
          dialogClassName={styles.threediumModal}
          show={showThreedium}
          onHide={() => setShowThreedium(false)}
        >
          <Modal.Header closeButton />
          <iframe
            src={product.threedium_url}
            height="640"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              border: '0px',
              zIndex: 10003,
              overflow: 'hidden',
              frameBorder: '0',
              scrolling: 'no',
            }}
          />
        </Modal>
      </>
    );
  }
  return null;
};

export default ThreediumView;
