import { GroupProps } from "@react-three/fiber";
import { Group } from "three";

// types.ts
export interface Position {
  x: number;
  y: number;
}

export interface PositionRange {
  startingPosition: Position;
  endingPosition: Position;
}

interface Hitbox {
  position: [number, number, number]; // [x, y, z] position
  scale: number | [number, number, number]; // Uniform scale or [x, y, z] scale
}


export type ActionName = "open" | "close" | "move" | "FirstStopPush" | "SecondStopPush" | "PullUp" | "PlungerPush" | "PlungerExtract" | "PlungerExpel" | "LiquidExpel" | "LiquidExtract";

// export interface ActionWithHitbox {
//   // performAction: () => void;
//   actionName: ActionName;
//   hitbox: Hitbox;
//   timeline?: { // have an optional timeline as well?
//     defaults: { [key: string]: any };
//     sequence: AnimationSequence[];
//   };
//   auto: boolean; // Should the animation play automatically on page load?
// }

export interface Action {
  // performAction: () => void;
  actionName: ActionName;
  hitbox?: Hitbox;
  timeline?: { // have an optional timeline as well?
    defaults: { [key: string]: any };
    sequence: AnimationSequence[];
  };
  auto: boolean; // Should the animation play automatically on page load?
  // If false, then it will play onClick of the hitbox
}

// Define the structure for animation sequence steps in a timeline
interface AnimationSequence {
  props: { [key: string]: any };
  // duration: number;
}

// Define the structure for actions with a timeline
// export interface ActionWithTimeline {
//   actionName: ActionName;
//   timeline: {
//     defaults: { [key: string]: any };
//     sequence: AnimationSequence[];
//   };
//   auto: boolean;
// }

// Union type for actions
// export type Action = Actions;
// export type Action = Actions | ActionWithTimeline;



export interface ModelProps {
  startingPosition:[number, number, number];
  scale: number;
  opacity: number;
  rotation: [number, number, number];
}



export interface AnalyticalBalanceModelProps extends ModelProps {
  isOpen: boolean;
}

// Additional specific model props definitions...

// For a microscope model
export interface MicroscopeModelProps extends ModelProps {
  magnificationLevel: number;
}

// For a centrifuge model
export interface CentrifugeModelProps extends ModelProps {
  rpm: number; // Revolutions per minute
}

// For a sample bottle
export interface SampleBottleModelProps extends ModelProps {
}

export interface BeakerProps extends ModelProps {

}

export interface YellowP200MicropipetteProps extends ModelProps {

}

export interface RedP2MicropipetteProps extends ModelProps {

}

export interface OrangeP20MicropipetteProps extends ModelProps {

}

export interface BlueP1000MicroPipetteProps extends ModelProps {

}

export interface PipetteStandProps extends ModelProps {

}

export interface YellowP200TipBoxProps extends ModelProps {

}

export interface RedP2TipBoxProps extends ModelProps {

}

export interface OrangeP20TipBoxProps extends ModelProps {

}

export interface BlueP1000TipBoxProps extends ModelProps {

}

export interface BeakerGlbProps extends ModelProps {

}

export interface HorizontalGelTankProps extends ModelProps {

}

export interface MicropipetteProps extends ModelProps {

}

export interface MicropipetteTipBoxProps extends ModelProps {

}

export interface BeakerWithOrangeReagnentProps extends ModelProps {
  
}

export interface WasteDisposalBoxProps extends ModelProps {
  
}

// Define a union of all specific ModelProps types
type LabModelProps = AnalyticalBalanceModelProps | MicroscopeModelProps | CentrifugeModelProps | SampleBottleModelProps | BeakerProps;


export interface RendererProps {
  schema: LabSchema;
}

export interface LabObject {
  name: string;
  model: any; // Adjust based on your 3D model's type
  // model: THREE.Mesh; // Adjust based on your 3D model's type
  actions: Action[]; // Updated to reflect the new actions structure
  modelProps: LabModelProps; // Use the generic type parameter
}

export interface TextInput {
  type: "textinput";
  placeholder: string;
  answerKey: string;
}

export interface Image {
  type: "image";
  src: string;
  caption?: string;
}

export interface QuizQuestion {
  type: "quiz";
  question: string;
  options: string[];
  correctAnswer: string;
}

export type InteractiveElement = TextInput | Image | QuizQuestion;

interface LabStep<T = any> { // T = any by default for maximum flexibility
  stepTitle: string;
  description: string;
  directions: string;
  user_instructions?: string;
  labObjects: LabObject[];
  interactiveElements?: InteractiveElement[];
  customStep?: React.ElementType<T>; // Using generic type T for custom step props
  // customStep?: React.FC<T> | React.ReactNode; // Using generic type T for custom step props
}

export type LabSchema = LabStep<any>[]; // Array of LabStep,