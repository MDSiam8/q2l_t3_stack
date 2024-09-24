import React, { useState, useEffect, forwardRef } from 'react';
import { RotavapWithHeatBathAnim } from '../rotavap/RotavapWithHeatOnAnim';
import { HundredMLFlask } from '../round-bottom-flasks/100mlRBFlask';
import { Html } from '@react-three/drei';
import { setNextEnabled } from '../Experience';
import { BumpTrap } from '../BumpTrap';
import { KeckClip } from '../KeckClip';
import SliderSwitch from '../rotavap/SliderSwitch'; // Adjust the import path accordingly

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step8TurnOnCondensorAndVacuum = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
  const [isCondensorOn, setCondensorOn] = useState(false);
  const [isVacuumOn, setVacuumOn] = useState(false);

  useEffect(() => {
    // Enable the next button after 3 seconds
    const timer = setTimeout(() => {
      if (nextButtonRef && nextButtonRef.current) {
        setNextEnabled(nextButtonRef);
      }
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [nextButtonRef]);

  const toggleCondensor = () => {
    setCondensorOn(!isCondensorOn);
  };

  const toggleVacuum = () => {
    setVacuumOn(!isVacuumOn);
  };

  return (
    <group>
      <RotavapWithHeatBathAnim position={[0, 5, 0]} scale={0.8} />
      <HundredMLFlask position={[2.2, 5, 0.4]} />
      <group position={[0.4, 5, -3.8]}>
        <KeckClip position={[0, 0, 0.6]} />
        <KeckClip />
      </group>
      <BumpTrap position={[-0.5, 5.25, -4.2]} rotation-x={Math.PI / 2} />

      {/* Condensor Toggle Switch */}
      <Html position={[2, 10, -2]} transform rotation-y={Math.PI / 2}>
        <div className="flex flex-col items-center justify-center">
          <SliderSwitch isChecked={isCondensorOn} onToggle={toggleCondensor} />
          <span className="text-sm select-none bg-slate-800 rounded-md p-1 text-white">
            Condensor
          </span>
        </div>
      </Html>

      {/* Vacuum Toggle Switch */}
      <Html position={[2, 10, 2]} transform rotation-y={Math.PI / 2}>
        <div className="flex flex-col items-center justify-center">
          <SliderSwitch isChecked={isVacuumOn} onToggle={toggleVacuum} />
          <span className="text-sm select-none bg-slate-800 rounded-md p-1 text-white">
            Vacuum
          </span>
        </div>
      </Html>
    </group>
  );
});

export default Step8TurnOnCondensorAndVacuum;
