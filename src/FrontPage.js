import React, { Suspense, lazy, useState, useEffect } from 'react';

const Component1 = lazy(() => import('./components/Navbar'));

const wrapper = {
  color: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Helvetica',
};
const container = {
  backgroundColor: 'red',
  height: '100vh',
  width: '100vw',
  padding: '10px',
};

const FrontPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set a timeout (5 seconds) for demonstration purposes

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={container}>
      {loading ? (
        <div style={wrapper}>
          <h1 style={{ textAlign: 'center' }}>Vachan NITRR</h1>
          <div>Loading...</div>
        </div>
      ) : (
        <div style={wrapper}>
          <h1 style={{ textAlign: 'center' }}>Vachan NITRR</h1>
          <Suspense fallback={<div>Component1 is loading, please wait...</div>}>
            <Component1 />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
