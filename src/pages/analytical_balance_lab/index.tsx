import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "./Experience";
//import Experience from "../../AnalyticalBalanceLab/components/Experience";

import * as THREE from "three";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"

type RootType = ReactDOM.Root | null;

function MyApp(): JSX.Element | null {
  const [root, setRoot] = useState<RootType>(null);

  const { mutate } = api.logger.create.useMutation();
  const { user } = useUser();
  const username = user?.fullName || "unknown"
  const handleClick = () => {
        mutate({ user: username, activity: "test!"})
  }
  const logActivity = (activity:string) => {
        mutate({ user: username, activity: activity})
  }

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
      // Cleanup function to handle component unmount
      if (root) {
        root.unmount();
      }
      
    };
  }, [root]);

  useEffect(() => {
    if (root) {
      root.render(
        <>
        
          <Experience  logActivity={logActivity}/>
          
        </>,
      );
    }
  }, [root]);

  return null;
}

export default MyApp;
