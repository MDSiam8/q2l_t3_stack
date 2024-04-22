import { OrbitControls, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { SampleBottleModelRef } from "~/utils/types/ref-types";
import { ActionName, ModelProps } from "~/utils/types/types";

// Export the 3D model
const modelPath = "/sample bottle body.gltf";

export const SampleBottleModel = forwardRef<SampleBottleModelRef, ModelProps>((props, ref) => {
  const bottle = useGLTF(modelPath);
  const bottleRef = useRef<any>();

  console.log(props);

  // Destructuring with renaming
  const { startingPosition: position, scale, opacity, rotation } = props;

  

  useImperativeHandle(ref, () => ({
    ...bottle.scene,
    ...bottleRef.current
    // You can add more methods here as needed
  }));
  
  // Assuming ModelProps includes properties like scale, opacity, and rotation
  // We need to transform these props into a format suitable for <primitive>
  // Note: 'opacity' might not directly apply to <primitive>, it typically applies to materials
  return <primitive object={bottle.scene} {...props} />;
  // scale={1.3}
  // opacity={0.8}
  // rotation={[0, (3.14 / 180) * 90, 0]}/>;
});

useGLTF.preload("./sample bottle body.gltf");
