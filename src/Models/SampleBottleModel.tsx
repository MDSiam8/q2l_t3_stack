import { OrbitControls, useGLTF } from '@react-three/drei';
import { Props } from '~/BaseComponents';
import { ModelProps } from '~/utils/types/types';

// Export the 3D model
// export const SampleBottleModel = "path/to/sample_bottle_model.glb";

export const SampleBottleModel = ({...props} : ModelProps) => {
    const { scene } = useGLTF("/sample bottle body.gltf");
    console.log(props);

    // Assuming ModelProps includes properties like scale, opacity, and rotation
    // We need to transform these props into a format suitable for <primitive>
    // Note: 'opacity' might not directly apply to <primitive>, it typically applies to materials
    const meshProps = {
        scale: props.scale, // Assuming scale is a number for uniform scaling, adjust if it's an array
        // 'opacity' handling would depend on modifying the material of the loaded model
        rotation: props.rotation, // Assuming rotation is an array [x, y, z]
    };
    return <primitive object={scene} {...meshProps} />;
    // scale={1.3}
    // opacity={0.8}
    // rotation={[0, (3.14 / 180) * 90, 0]}/>;
  };
  
// Export action functions specific to the Sample Bottle
export const openBottle = () => console.log("Opening the sample bottle.");

useGLTF.preload("./sample bottle body.gltf")