import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
  } from "react";
  
  import { GlassDropper } from "../models/GlassDropper";
  import { Flask } from "../models/Flask";
  import { Stopper } from "../models/Stopper" 
  import * as THREE from "three";
  import * as TWEEN from "@tweenjs/tween.js";
  
  const Step4OpenSideWindow = () => {
  
      return (
        <group>
          <Flask
            position={[0.15, 5, 0]}
          />
          
          
          <Stopper
            rotation-x={(3.14 / 180) * 180}
            scale={0.5}
            position={[0.15, 7.5, 0]}
          />
        </group>
      );
    };
  
  
  export default Step4OpenSideWindow;
  