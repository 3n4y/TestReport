import React, { useEffect } from 'react';

const AnyRoadsTourComponent = ({ data }) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://www.anyguide.com/assets/integration-v1.1.js';
    script.async = true;
    script.onload = () => {
      window.anyroad = new window.AnyRoad(data.configuration);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [data]);

  return (
    <>

      <div style={{ minHeight: '768px' }} id={`${data.container_id}`} />
    </>
  );
};

export default AnyRoadsTourComponent;
