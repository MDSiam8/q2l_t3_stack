// Assuming Rotovap has specific actions that can be performed
import { rotate, lift, move } from "~/3dModels/RotVapActions"; // Example import paths

interface Position {
  x: number;
  y: number;
}

interface Action {
  (): void; // Define an Action as a function with no parameters and no return value
}

interface ObjectInFocus {
  name: string;
  actions: Record<string, Action>; // Using a Record to map action names to functions
  position: Position;
}

interface LabStep {
  stepTitle: string;
  description: string;
  directions: string;
  user_instructions?: string;
  objectsInFocus: ObjectInFocus[];
}

type State = LabStep[];

export const state: State = [
  {
    stepTitle: "Lab Objectives",
    description: "Introduction to the lab and overview of objectives.",
    directions: "In this lab, you will learn how to use a rotary evaporator (rotavap).",
    objectsInFocus: [
      {
        name: "Rotovap",
        actions: {
          rotate: rotate, // Assuming rotate is a function imported or defined elsewhere
          lift: lift,
          move: move,
        },
        position: { x: 100, y: 200 },
      },
    ],
  },
  // Additional steps...
];

