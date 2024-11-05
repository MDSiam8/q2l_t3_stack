import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "../../DilutingStandardSolutionLab/Experience";
// import Experience from "../../../AnalyticalBalanceLab/components/Experience";
import * as THREE from "three";

type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);

  useEffect(() => {
    const rootElement = document.querySelector("#root") as HTMLElement;
    if (!rootElement) {
      throw new Error("Couldn't find the root element");
    }

    if (!root) {
      const newRoot = ReactDOM.createRoot(rootElement);
      setRoot(newRoot);
    }

    return () => {
      // Cleanup function to handle component unmount
      if (root) {
        root.unmount();
      }
      
    };
  }, [root]);

  useEffect(() => {
    if (root) {
      root.render(
        <>
          <Experience />
        </>,
      );
    }
  }, [root]);

  return null;
}

export default MyApp;
