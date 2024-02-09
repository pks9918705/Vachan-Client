import React, { useEffect } from "react";
import { useNavigate,   } from "react-router-dom";

const FailurePayment = () => {
 
  const navigate = useNavigate();

  // Redirect to home after 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        height: "100vh",
      }}
    >
      <div
        className="img"
        style={{
          backgroundImage:
            'url("https://miro.medium.com/v2/resize:fit:418/1*9MB_2QMF-LN5Va_V7urxwA.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#64D9D6",

          width: "250px",
          height: "200px", // Adjust the height as needed
        }}
      ></div>

     
    </div>
  );
};

export default FailurePayment;
