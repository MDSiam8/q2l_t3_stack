import RotovapModel, { rotate, lift, move } from "~/3dModels/RotovapModel";

interface Position {
  x: number;
  y: number;
}

interface PositionRange {
  startingPosition: Position;
  endingPosition: Position;
}

interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ActionWithHitbox {
  action: () => void;
  hitbox: Hitbox;
}

interface ObjectInFocus {
  name: string;
  model: any;
  actions: Record<string, ActionWithHitbox>;
  position: PositionRange;
}

// Define interfaces for additional components
interface TextInput {
  type: "textinput";
  placeholder: string;
  answerKey: string; // For quiz or interactive response validation
}

interface Image {
  type: "image";
  src: string;
  caption?: string;
}

interface QuizQuestion {
  type: "quiz";
  question: string;
  options: string[];
  correctAnswer: string;
}

// Use a union type for different types of interactive elements
type InteractiveElement = ObjectInFocus | TextInput | Image | QuizQuestion;

interface LabStep {
  stepTitle: string;
  description: string;
  directions: string;
  user_instructions?: string;
  interactiveElements: InteractiveElement[]; // Array of various interactive elements
}

type State = LabStep[];

export const state: State = [
  {
    stepTitle: "Lab Objectives",
    description: "Introduction to the lab and overview of objectives.",
    directions: "In this lab, you will learn how to use a rotary evaporator (rotavap).",
    interactiveElements: [
      {
        type: "textinput",
        placeholder: "Enter your observation...",
        answerKey: "Water evaporates at 100°C",
      },
      {
        type: "image",
        src: "/path/to/image.jpg",
        caption: "Rotary Evaporator",
      },
      {
        type: "quiz",
        question: "What is the boiling point of water?",
        options: ["90°C", "100°C", "110°C"],
        correctAnswer: "100°C",
      },
      // Include ObjectInFocus elements as before
    ],
  },
  // Additional steps...
];
