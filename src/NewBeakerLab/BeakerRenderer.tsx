import { useGLTF } from "@react-three/drei";
import LabRenderer from "../Renderer/LabRenderer"
import { preload } from "react-dom";
import { SampleBeakerLabSchema } from "./SampleBeakerLabSchema";

const modelPath = "./Beaker.gltf";

export default function BeakerExperience() {

    return LabRenderer({schema: SampleBeakerLabSchema})

}
useGLTF.preload(modelPath);
