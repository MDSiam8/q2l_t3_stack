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


type ActionName = "open" | "close" 

export interface ActionWithHitbox {
  // performAction: () => void;
  actionName: ActionName;
  hitbox: Hitbox;
}

export interface ModelProps {
  position: PositionRange;
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



// Using Generics to define the model props
export interface ObjectInFocus {
  name: string;
  model: any; // Adjust based on your 3D model's type
  actions: ActionWithHitbox[]; // Updated to reflect the new actions structure
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

export interface LabStep {
  stepTitle: string;
  description: string;
  directions: string;
  user_instructions?: string;
  objectsInFocus: ObjectInFocus[];
  interactiveElements?: InteractiveElement[];
}

export type LabSchema = LabStep[];
