import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import BeakerExperience from "../../NewBeakerLab/BeakerRenderer";

function MyApp() {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return; // Exit if no root element found

    const root = ReactDOM.createRoot(rootElement);
    root.render(<BeakerExperience />);

    return () => root.unmount(); // Cleanup
  }, []);

  return null; // MyApp doesn't need to render anything itself
}

export default MyApp;