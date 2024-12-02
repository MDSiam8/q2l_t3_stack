import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "../../AnalyticalBalanceLab/components/Experience";
// import Experience from "../../../AnalyticalBalanceLab/components/Experience";
import * as THREE from "three";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Update import path if necessary
import { useRouter } from "next/router";

type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();

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
      if (root) {
        root.unmount();
      }
    };
  }, [root]);

  useEffect(() => {
    if (!router.isReady) return;

    const stepParam = router.query.step;
    const stepNumber = stepParam ? parseInt(stepParam as string, 10) : 1;

    // Validate the step number is within bounds (assuming max 10 steps for Analytical Balance Lab)
    if (stepNumber >= 1 && stepNumber <= 10) {
      setCurrentStep(stepNumber);
    } else {
      // If the step number is invalid, default to step 1
      setCurrentStep(1);
      // Update the URL to reflect the default step
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, step: 1 },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router.isReady, router.query.step]);

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
  }, [root, currentStep, router]);

  return null;
}

export default MyApp;
