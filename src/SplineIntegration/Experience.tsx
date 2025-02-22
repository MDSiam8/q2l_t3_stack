import Spline from '@splinetool/react-spline';
import type { Application, SPEObject } from '@splinetool/runtime';
import React, { useRef } from 'react';

export default function App() {

  const table = useRef<SPEObject>();

  const onLoad = (spline: Application) => {
    const obj = spline.findObjectByName("TeaTable01")
    table.current = obj;
  }

  const moveObject = () => {
    console.log(table.current)
    if (table.current) {
      table.current.position.x += 10;
    }
  }
  
  return (
    <div>
      <button onClick={moveObject}>Move Object</button>
    <Spline scene="https://prod.spline.design/lzqCwgPXt-R17v9O/scene.splinecode" 
      onLoad={onLoad}
    />
    </div>
  );
}
