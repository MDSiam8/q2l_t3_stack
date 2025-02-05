import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Experience from "../../StandardStockSolutionLab/Experience";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

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

    // Read the step from the URL query parameter (if present)
    const stepParam = router.query.step;
    const urlStep = stepParam ? parseInt(stepParam as string, 10) : NaN;

    // Read from cookie (using a unique cookie name for this lab)
    const cookieValue = Cookies.get("standardStockLabLastStep");
    const cookieStep = cookieValue ? parseInt(cookieValue, 10) : NaN;

    // Determine the initial step (assume valid steps are 1–20)
    let initialStep = 1;
    if (!isNaN(urlStep) && urlStep >= 1 && urlStep <= 20) {
      initialStep = urlStep;
    } else if (!isNaN(cookieStep) && cookieStep >= 1 && cookieStep <= 20) {
      initialStep = cookieStep;
    }

    setCurrentStep(initialStep);

    // If the URL step is missing or invalid, update the URL accordingly
    if (urlStep !== initialStep) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, step: initialStep },
        },
        undefined,
        { shallow: true },
      );
    }

    // Always update the cookie so that it reflects the current step
    Cookies.set("standardStockLabLastStep", String(initialStep));
  }, [router.isReady, router.query.step]);

  useEffect(() => {
    if (root) {
      root.render(
        <>
          <Experience
            currentStep={currentStep}
            onStepChange={(newStep: number) => {
              setCurrentStep(newStep);
              Cookies.set("standardStockLabLastStep", String(newStep));
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
        </>
      );
    }
  }, [root, currentStep, router]);

  return null;
}

export default MyApp;
