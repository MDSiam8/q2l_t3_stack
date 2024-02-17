import { AnalyticalBalanceModelRef } from "~/Models/AnalyticalBalanceModel";

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


export type ActionName = "open" | "close" | "move"

export interface ActionWithHitbox {
  // performAction: () => void;
  actionName: ActionName;
  hitbox: Hitbox;
}

// Define the structure for animation sequence steps in a timeline
interface AnimationSequence {
  props: { [key: string]: any };
  // duration: number;
}

// Define the structure for actions with a timeline
export interface ActionWithTimeline {
  actionName: ActionName;
  timeline: {
    defaults: { [key: string]: any };
    sequence: AnimationSequence[];
  };
}

// Union type for actions
export type Action = ActionWithHitbox | ActionWithTimeline;

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

// Define a union of all specific ModelProps types
type LabModelProps = AnalyticalBalanceModelProps | MicroscopeModelProps | CentrifugeModelProps | SampleBottleModelProps ;

export interface LabObject {
  name: string;
  model: any; // Adjust based on your 3D model's type
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
