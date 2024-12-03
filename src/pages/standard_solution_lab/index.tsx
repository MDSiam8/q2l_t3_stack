import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Experience from "../../StandardStockSolutionLab/Experience";

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<ReactDOM.Root | null>(null);

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

    // Validate the step number is within bounds (assuming max 20 steps)
    if (stepNumber >= 1 && stepNumber <= 20) {
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
        <>
          <Experience
            currentStep={currentStep}
            onStepChange={(newStep: number) => {
              setCurrentStep(newStep);
              router.replace(
                {
                  pathname: router.pathname,
                  query: { ...router.query, step: newStep },
                },
                undefined,
                { shallow: true },
              );
            }}
          />
        </>,
      );
    }
  }, [root, currentStep, router]);

  return null;
}

export default MyApp;