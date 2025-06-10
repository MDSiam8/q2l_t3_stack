import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Experience from "~/AnalyticalBalanceLab/components/Experience";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // <-- import for cookie handling

type RootType = ReactDOM.Root | null;

const cookieName = "analyticalBalanceLastStep"; // UNIQUE cookie name for this lab

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    // Create our ReactDOM root once
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

    // 1) Read `step` from the URL
    const stepParam = router.query.step;
    const stepFromUrl = stepParam ? parseInt(stepParam as string, 10) : 0;

    // 2) Read from our unique cookie
    const cookieValue = Cookies.get(cookieName);
    const stepFromCookie = cookieValue ? parseInt(cookieValue, 10) : 0;

    let initialStep = 1; // fallback

    // If URL step is valid (1..13 for Analytical Balance Lab)
    if (stepFromUrl >= 1 && stepFromUrl <= 13) {
      initialStep = stepFromUrl;
    }
    // Otherwise, if cookie step is valid (1..13)
    else if (stepFromCookie >= 1 && stepFromCookie <= 13) {
      initialStep = stepFromCookie;
    }

    // Sync state
    setCurrentStep(initialStep);

    // If the URL was invalid or missing step, correct it
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

    // 3) Update the cookie so manual URL changes are saved too
    Cookies.set(cookieName, String(initialStep));
  }, [router.isReady, router.query.step, router]);

  useEffect(() => {
    // Render the 3D lab with the correct step
    if (root) {
      root.render(
        <Experience
          currentStep={currentStep}
          onStepChange={(newStep: number) => {
            // Update parent state
            setCurrentStep(newStep);
            // Save new step in cookie
            Cookies.set(cookieName, String(newStep));
            // Update the URL's `step` query param
            router.replace(
              {
                pathname: router.pathname,
                query: { ...router.query, step: newStep },
              },
              undefined,
              { shallow: true },
            );
          }}
          onLabComplete={() => {
            // Clear the cookie when lab is completed
            Cookies.remove(cookieName);
            // Navigate back to lab menu
            router.push('/dashboard');
          }}
        />,
      );
    }
  }, [root, currentStep, router]);

  return null;
}

export default MyApp;
