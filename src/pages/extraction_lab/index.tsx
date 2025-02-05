import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Experience from "../../SeperatingLiquidsLab/components/Experience";

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
      if (root) {
        root.unmount();
      }
    };
  }, [root]);

  useEffect(() => {
    if (root) {
      root.render(
        // Set the basename to match your folder structure:
        <BrowserRouter basename="/extraction_lab">
          <Routes>
            {/* Now the step route is relative to /extraction_lab */}
            <Route path="/step/:step" element={<Experience />} />
            {/* Fallback routes */}
            <Route path="/" element={<Experience />} />
            <Route path="*" element={<Experience />} />
          </Routes>
        </BrowserRouter>
      );
    }
  }, [root]);

  return null;
}

export default MyApp;
