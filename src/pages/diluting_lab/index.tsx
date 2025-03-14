import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Experience from "../../DilutingStandardSolutionLab/Experience";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    // Create or store the ReactDOM root
    const rootElement = document.querySelector("#root") as HTMLElement;
    if (!rootElement) {
      throw new Error("Couldn't find the root element");
    }

    if (!root) {
      const newRoot = ReactDOM.createRoot(rootElement);
      setRoot(newRoot);
    }

    // Cleanup on unmount
    return () => {
      if (root) {
        root.unmount();
      }
    };
  }, [root]);

  useEffect(() => {
    if (!router.isReady) return;

    const stepParam = router.query.step;
    const stepFromUrl = stepParam ? parseInt(stepParam as string, 10) : 0;

    // Read from cookie
    const cookieValue = Cookies.get("lastStep");
    const stepFromCookie = cookieValue ? parseInt(cookieValue, 10) : 0;

    let initialStep = 1; // fallback

    // Priority #1: valid step from URL
    if (stepFromUrl >= 1 && stepFromUrl <= 20) {
      initialStep = stepFromUrl;
    }
    // Priority #2: if URL step invalid, try cookie
    else if (stepFromCookie >= 1 && stepFromCookie <= 20) {
      initialStep = stepFromCookie;
    }

    setCurrentStep(initialStep);

    // If URL is missing or invalid, correct it
    if (stepFromUrl !== initialStep) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, step: initialStep },
        },
        undefined,
        { shallow: true },
      );
    }

    // -------------------------------------------------------
    // IMPORTANT: Set the cookie, so manual URL changes also save
    Cookies.set("lastStep", String(initialStep));
    // -------------------------------------------------------
  }, [router.isReady, router.query.step, router]);

  useEffect(() => {
    // Re-render Experience with updated currentStep
    if (root) {
      root.render(
        <>
          <Experience
            currentStep={currentStep}
            onStepChange={(newStep: number) => {
              // Keep internal state updated
              setCurrentStep(newStep);

              // Save new step in cookie
              Cookies.set("lastStep", String(newStep));

              // Update the URL query param as well
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
