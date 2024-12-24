import React, { useState } from "react";

const Step8UIOverlay: React.FC = () => {
  const [message, setMessage] = useState("");

  // Handle the button clicks
  const handleButtonClick = (color: string) => {
    if (color === "white") {
      setMessage("This selection is correct!");
    } else {
      setMessage("This selection is incorrect.");
    }
  };

  // Define some inline styles for the buttons
  const buttonStyles = {
    main: {
      width: "60px",
      height: "60px",
      backgroundColor: "#001f3f", // dark blue
      border: "none",
      marginRight: "10px",
      cursor: "pointer",
      position: "relative" as const,
    },
    innerSquare: (color: string) => ({
      width: "30px",
      height: "30px",
      backgroundColor: color,
      position: "absolute" as const,
      top: "15px",
      left: "15px",
    }),
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex" }}>
        {/* Green Button */}
        <button
          style={buttonStyles.main}
          onClick={() => handleButtonClick("green")}
        >
          <div style={buttonStyles.innerSquare("green")} />
        </button>

        {/* Red Button */}
        <button
          style={buttonStyles.main}
          onClick={() => handleButtonClick("red")}
        >
          <div style={buttonStyles.innerSquare("red")} />
        </button>

        {/* White Button */}
        <button
          style={buttonStyles.main}
          onClick={() => handleButtonClick("white")}
        >
          <div style={buttonStyles.innerSquare("white")} />
        </button>
      </div>

      {/* Display a message below the buttons */}
      {message && (
        <p
          style={{
            color: "#fff",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Step8UIOverlay;
