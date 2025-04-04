import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Experience from "../../UpdatedMicropipetteLab/Experience";
import * as THREE from "three";
import { useRouter } from "next/router";


type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const rootElement = document.getElementById("root");
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
