import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { setNextDisabled, setNextEnabled } from "../Experience";
import {Beaker} from "../models/Beaker";

interface CheckBeakerResidueProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  // Add other props as necessary
}

const Step15CheckBeakerResidue: React.FC<CheckBeakerResidueProps> = ({
  nextButtonRef,
}) => {
  const [hasResidue, setHasResidue] = useState(true); // Simulate whether there's residue or not
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Control popup visibility

  // Disable the Next button initially if residue is present
  useEffect(() => {
    if (nextButtonRef.current) {
      if (hasResidue) {
        setNextDisabled(nextButtonRef);
      } else {
        setNextEnabled(nextButtonRef);
      }
    }
  }, [hasResidue, nextButtonRef]);

  const handleRinseAgain = () => {
    // Logic for rinsing again (reset residue to true)
    setHasResidue(true);
    setIsPopupVisible(false);
  };

  const handleContinue = () => {
    if (hasResidue) {
      // Show popup if residue still remains
      setIsPopupVisible(true);
    } else {
      // If no residue, proceed with the next step
      setIsPopupVisible(false);
      setNextEnabled(nextButtonRef);
    }
  };

  return (
    <group>
      {/* HTML elements for buttons */}
      <Html position={[0, 6, 0]} transform scale={0.5} rotation-y={90 * 3.14159/180}>
        {/* Rinse Again Button */}
        <button
          className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
          onClick={handleRinseAgain}
        >
          Rinse Again
        </button>

        {/* Continue Button */}
        <button
          className="ml-4 rounded-md p-3 text-sm font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg transition-transform duration-300"
          onClick={handleContinue}
        >
          Continue
        </button>
      </Html>

      {/* Popup for residue warning */}
      {isPopupVisible && (
        <Html position={[0, 7, 0]} transform scale={0.5} rotation-y={90 * 3.14159/180}>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Warning: </strong>
            <span>Please rinse again, as the residue still remains.</span>
            <button
              className="absolute top-0 right-0 px-4 py-3"
              onClick={() => setIsPopupVisible(false)}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.348 5.652a1 1 0 010 1.415L11.414 10l2.934 2.934a1 1 0 01-1.414 1.415L10 11.414l-2.934 2.934a1 1 0 01-1.415-1.415L8.586 10 5.652 7.066a1 1 0 011.414-1.414L10 8.586l2.934-2.934a1 1 0 011.414 0z" />
              </svg>
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Step15CheckBeakerResidue;
