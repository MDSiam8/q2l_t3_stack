import { OrbitControls, useGLTF } from "@react-three/drei";
import { Props } from "~/BaseComponents";
import { ModelProps } from "~/utils/types/types";

// Export the 3D model
// export const SampleBottleModel = "path/to/sample_bottle_model.glb";

export const SampleBottleModel = ({ ...props }: ModelProps) => {
  const { scene } = useGLTF("/sample bottle body.gltf");
  console.log(props);

  // Destructuring with renaming
  const { startingPosition: position, scale, opacity, rotation } = props;

  // Assuming ModelProps includes properties like scale, opacity, and rotation
  // We need to transform these props into a format suitable for <primitive>
  // Note: 'opacity' might not directly apply to <primitive>, it typically applies to materials
  return <primitive object={scene} {...props} />;
  // scale={1.3}
  // opacity={0.8}
  // rotation={[0, (3.14 / 180) * 90, 0]}/>;
};

useGLTF.preload("./sample bottle body.gltf");
