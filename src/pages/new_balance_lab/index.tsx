import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Experience from "../../NewBalanceLab/AnalayticalBalanceRenderer";

function MyApp() {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return; // Exit if no root element found

    const root = ReactDOM.createRoot(rootElement);
    root.render(<Experience />);

    return () => root.unmount(); // Cleanup
  }, []);

  return null; // MyApp doesn't need to render anything itself
}

export default MyApp;
