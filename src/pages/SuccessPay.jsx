import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SuccessPay = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get('reference');
  const navigate = useNavigate();

  // Redirect to home after 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor:"#64D9D6",height:"100vh" }}>
      <div
        className="img"
        style={{
          backgroundImage: 'url("https://www.icegif.com/wp-content/uploads/2023/08/icegif-731.gif")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor:"#64D9D6",
          
          width: '100%',
          height: '50vh', // Adjust the height as needed
        }}
      ></div>

      <h3 style={{ marginTop: '5px', fontSize: '1.2rem' ,color:"green"}}>referenceNum</h3>
      <h3 style={{ marginTop: '20px', fontSize: '1.5rem' ,color:"green"}}>{referenceNum}</h3>
    </div>
  );
};

export default SuccessPay;
