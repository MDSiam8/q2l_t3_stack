import { useState, useEffect } from "react";

const useContextFromFile = (fileName: string): string => {
  const [context, setContext] = useState<string>("");

  useEffect(() => {
    if (!fileName) return;
    // Adjust the path as needed. Here we assume the file is in /public/contexts/
    fetch(`/contexts/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch context file: ${fileName}`);
        }
        return response.text();
      })
      .then((text) => setContext(text))
      .catch((error) => {
        console.error(`Error fetching context file ${fileName}:`, error);
      });
  }, [fileName]);

  return context;
};

export default useContextFromFile;
