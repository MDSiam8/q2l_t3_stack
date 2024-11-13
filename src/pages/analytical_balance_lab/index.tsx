import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "../../AnalyticalBalanceLab/components/Experience";
// import Experience from "../../../AnalyticalBalanceLab/components/Experience";
import * as THREE from "three";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        <BrowserRouter>
        <Routes>
          {/* Define routes without forced redirects */}
          <Route path="/analytical_balance_lab/step/:AnalyticalBalanceCurrentStep" element={<Experience />} />
          <Route path="/analytical_balance_lab" element={<Experience />} />
          <Route path="/" element={<Experience />} />
          {/* Optionally, handle unmatched paths */}
          <Route path="*" element={<Experience />} />
        </Routes>
      </BrowserRouter>
      );
    }
  }, [root]);

  return null;
}

export default MyApp;
