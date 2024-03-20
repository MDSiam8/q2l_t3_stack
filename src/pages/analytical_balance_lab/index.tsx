import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "../../AnalyticalBalanceLab/components/Experience";
// import Experience from "../../../AnalyticalBalanceLab/components/Experience";
import { useUser } from "@clerk/nextjs";

import * as THREE from "three";

type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);
  const { user } = useUser();



  useEffect(() => {
    const rootElement = document.querySelector("#root") as HTMLElement;
    if (!rootElement) {
      throw new Error("Couldn't find the root element");
    }

    if (!root) {
      const newRoot = ReactDOM.createRoot(rootElement);
      setRoot(newRoot);
      const userName = user?.fullName || "unknown"
    const input = {user: userName, activity: `Analytical Balance opened`}
    const url = 'https://magicloops.dev/api/loop/run/7d23dbac-e54a-4ce6-9e92-f3ef4c8ab23e';

      // const response = await fetch(url, {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ input: JSON.stringify(input) }),
      });
      console.log(JSON.stringify(input));
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
