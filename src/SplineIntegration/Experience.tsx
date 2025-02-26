import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import state from './state.json';

// Mapping scene numbers to Spline scene URLs. Adjust as needed.
const sceneUrls = {
  "1": "https://prod.spline.design/lzqCwgPXt-R17v9O/scene.splinecode",
  "2": "https://prod.spline.design/lzqCwgPXt-R17v9O/scene.splinecode",
  // Add more scenes here
};

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const stateKey = currentScene.toString();
  const currentSceneUrl = sceneUrls[stateKey] || sceneUrls["1"];
  const stepData = state[stateKey];

  const handleNextScene = () => {
    const nextScene = currentScene + 1;
    // Only update if there's data for the next scene
    if (state[nextScene.toString()]) {
      setCurrentScene(nextScene);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Spline Scene */}
      <Spline scene={currentSceneUrl} />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.2)', // semi-transparent background
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <div className="flex items-stretch justify-center">
          <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
            <h1 className="mb-2 text-lg text-white">{stepData.stepTitle}</h1>
            <p className="text-white">{stepData.directions}</p>
            {stepData.user_instructions && (
              <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">
                {stepData.user_instructions}
              </p>
            )}
          </div>
          <div className="ml-4 flex flex-col justify-between self-stretch">
            <button
              onClick={handleNextScene}
              className="mb-0 flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105"
            >
              Next Scene
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
