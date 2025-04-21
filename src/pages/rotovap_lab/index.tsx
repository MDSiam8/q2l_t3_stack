import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Experience from "../../RotaryEvaporation/components/Experience";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element {
  const router = useRouter();
  const [root, setRoot] = useState<RootType>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Always return some JSX so that the hook order remains constant.
  // (We return an empty <div /> while our effects run.)
  // Set up the ReactDOM root once.
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

  // When the router is ready, check if the URL already includes a query parameter.
  // If not, update the URL to include ?step=X.
  useEffect(() => {
    if (!router.isReady) return;

    // If router.asPath doesn't contain a "?" then there are no query parameters.
    if (!router.asPath.includes("?")) {
      // If there's no query parameter, try to get the step from the cookie, or default to 1.
      const cookieStep = Cookies.get("rotovapLabLastStep");
      const initialStep = cookieStep ? parseInt(cookieStep, 10) : 1;
      setCurrentStep(initialStep);
      Cookies.set("rotovapLabLastStep", String(initialStep));
      // Update the URL to include the step.
      router.replace(
        {
          pathname: router.pathname,
          query: { step: initialStep },
        },
        undefined,
        { shallow: true }
      );
    } else {
      // If there is a query, use it (or the cookie if missing) and validate.
      const stepParam = router.query.step;
      const cookieStep = Cookies.get("rotovapLabLastStep");
      const initialStep = stepParam
        ? parseInt(stepParam as string, 10)
        : cookieStep
        ? parseInt(cookieStep, 10)
        : 1;
      if (initialStep < 1 || initialStep > 20) {
        setCurrentStep(1);
        router.replace(
          {
            pathname: router.pathname,
            query: { ...router.query, step: 1 },
          },
          undefined,
          { shallow: true }
        );
      } else {
        setCurrentStep(initialStep);
      }
      Cookies.set("rotovapLabLastStep", String(initialStep));
    }
  }, [router.isReady, router.asPath, router.query.step, router]);

  // Whenever currentStep changes (and once the router and root are ready), render the Experience.
  useEffect(() => {
    if (router.isReady && root) {
      root.render(
        <Experience
          currentStep={currentStep}
          onStepChange={(newStep: number) => {
            setCurrentStep(newStep);
            Cookies.set("rotovapLabLastStep", String(newStep));
            router.replace(
              {
                pathname: router.pathname,
                query: { ...router.query, step: newStep },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
      );
    }
  }, [router.isReady, root, currentStep, router]);

  return <div />;
}

export default MyApp;
