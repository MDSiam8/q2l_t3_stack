import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
  } from "react";
  
  import { GlassDropper } from "../models/GlassDropper";
  import { Flask } from "../models/Flask";
  import { GlassRod } from "../models/GlassRod";
  import * as THREE from "three";
  import * as TWEEN from "@tweenjs/tween.js";
  
  const Step4OpenSideWindow = () => {
  
      return (
        <group>
          <Flask
            position={[0.15, 5, 0]}
          />
          
          <GlassRod
            rotation-x={(3.14 / 180) * 15}
            position={[0.15, 6.5, 0]}
          />
          <GlassDropper
            rotation-x={-(3.14 / 180) * 75}
            scale={0.5}
            position={[0.15, 6.9, 0.1]}
          />
        </group>
      );
    };
  
  
  export default Step4OpenSideWindow;
  