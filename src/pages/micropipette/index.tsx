import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Experience from "../../NewArchitectureOfficialLabs/Micropipette/MicropipetteLabRenderer";

type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);

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
    if (root) {
      // Using HashRouter instead of BrowserRouter to avoid server routing issues
      root.render(
        <HashRouter>
          <Routes>
            {/* This route will match URLs like:  http://localhost:3000/#/step/0 */}
            <Route path="/step/:step" element={<Experience />} />
            <Route path="/" element={<Experience />} />
            <Route path="*" element={<Experience />} />
          </Routes>
        </HashRouter>
      );
    }
  }, [root]);

  return null;
}

export default MyApp;
