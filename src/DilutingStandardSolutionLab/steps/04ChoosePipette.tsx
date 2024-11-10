import React, { forwardRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { GlassPipette } from "../models/GlassPipette";
import { PipetteBulb } from "../models/PipetteBulb";

const Step04ChoosePipette = ({ nextButtonRef }: { nextButtonRef: React.RefObject<HTMLButtonElement> }) => {
  const [showDialog, setShowDialog] = useState(true); // Show initial dialog
  const [showMicropipetteWarning, setShowMicropipetteWarning] = useState(false); // Show warning for micropipette

  const handlePipetteSelection = (selection: "glass" | "micropipette") => {
    if (selection === "micropipette") {
      setShowMicropipetteWarning(true);
    } else {
      setShowDialog(false);
      if (nextButtonRef && nextButtonRef.current) {
        setNextEnabled(nextButtonRef); // Enable the next button for glass pipette
      }
    }
  };

  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, [nextButtonRef]);

  return (
    <group>
      <group>
        <GlassPipette position={[0, 5.5, 0]} />
        <PipetteBulb position={[0, 8, 0]} />
      </group>
      {showDialog && (
        <Html
          transform
          rotation-y={Math.PI / 2}
          position={[0, 8, 0]}
          scale={0.6}
          center
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <div
            className="dialog-container"
            style={{
              backgroundColor: "rgba(50, 50, 50, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
              minWidth: "300px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              pointerEvents: "auto",
            }}
          >
            <h2>Select a pipette for transferring solutions:</h2>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => handlePipetteSelection("glass")}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  marginRight: "10px",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Glass Pipette
              </button>
              <button
                onClick={() => handlePipetteSelection("micropipette")}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Micropipette
              </button>
            </div>
          </div>
        </Html>
      )}
      {showMicropipetteWarning && (
        <Html
          transform
          rotation-y={Math.PI / 2}
          position={[1, 8, 0]}
          center
          scale={0.6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <div
            className="dialog-container warning"
            style={{
              backgroundColor: "rgba(50, 50, 50, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
              minWidth: "300px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              pointerEvents: "auto",
            }}
          >
            <h2>
              Micropipettes are designed for much smaller sample sizes. Consider
              using a glass pipette for this case.
            </h2>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => setShowMicropipetteWarning(false)}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};



export default Step04ChoosePipette;
