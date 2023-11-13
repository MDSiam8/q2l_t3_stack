// BalanceReading.tsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Html } from '@react-three/drei';

const BalanceReading = forwardRef((props, ref) => {
  const [displayedWeight, setDisplayedWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomVariation = Math.random() * 0.1 - 0.05;
      setDisplayedWeight(prevWeight => prevWeight + randomVariation);

      const convergenceRate = 0.87;
      setDisplayedWeight(prevWeight => prevWeight + (targetWeight - prevWeight) * convergenceRate);
    }, 200);

    return () => clearInterval(interval);
  }, [targetWeight]);

  const addWeight = (weight) => {
    setTargetWeight(prevWeight => prevWeight + weight);
  };
  const setWeight = (weight) => {
    setTargetWeight(weight);
  };
  useImperativeHandle(ref, () => ({
    addWeight, setWeight
  }));

  return (
    <Html occlude position={[1.9, .86, 0]} transform rotation-y={Math.PI / 180 * 90} rotation-x={Math.PI / 180 * 0} scale={0.2} zIndexRange={[10,1]}>
      <div className="bg-blue-300 bg-opacity-40 w-60 text-white p-4 rounded-3xl">
        <h2 className="text-xl mb-2 whitespace-pre-wrap text-center">{displayedWeight.toFixed(2)} g</h2>
        {/* <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => addWeight(10)}
        >
          Add 10g
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addWeight(20)}
        >
          Add 20g
        </button> */}
      </div>
    </Html>
  );
});

export default BalanceReading;
