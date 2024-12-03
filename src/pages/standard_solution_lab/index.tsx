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
    if (root) {
      root.render(
        <BrowserRouter>
          <Routes>
            <Route path="/standard_solution_lab/step/:step" element={<Experience />} />
            <Route path="/standard_solution_lab" element={<Experience />} />
            <Route path="*" element={<Experience />} />
          </Routes>
        </BrowserRouter>
      );
    }
  }, [root]);

  return null;
}

export default MyApp;
