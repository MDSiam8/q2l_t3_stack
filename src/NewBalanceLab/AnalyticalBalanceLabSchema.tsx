import {
  LabSchema,
  ObjectInFocus,
  InteractiveElement,
} from "../utils/types/types";
import {
  AnalyticalBalanceModel,
  openBalance,
  AnalyticalBalanceModelRef
} from "~/Models/AnalyticalBalanceModel";
import { SampleBottleModel, openBottle } from "~/Models/SampleBottleModel";

export const AnalyticalBalanceLabSchema: LabSchema = [
  {
    stepTitle: "Lab Objectives",
    description: "Simply a starting page describing what we'll do in this lab",
    directions: "In this lab, you will learn how to use an analytical balance.",
    user_instructions:
      "Please familiarize yourself with the analytical balance.",
    objectsInFocus: [
      {
        name: "Analytical Balance",
        model: AnalyticalBalanceModel,
        actions: [
          {
            actionName: "open",
            hitbox: {
              position: [0, 2, 0],
              scale: 3,
            },
          },
        ],
        modelProps: {
          position: {
            startingPosition: { x: 0, y: 0 },
            endingPosition: { x: 50, y: 50 },
          },
          isOpen: false,
          scale: 1.3,
          opacity: 0.8,
          rotation: [0, (3.14 / 180) * 90, 0], // Example rotation
        },
      },
    ],
    interactiveElements: [
      {
        type: "textinput",
        placeholder:
          "What do you think is the importance of an analytical balance in the lab?",
        answerKey: "Any thoughtful answer",
      },
      {
        type: "image",
        src: "/path/to/analytical_balance.jpg",
        caption: "An Analytical Balance",
      },
    ],
  },
  {
    stepTitle: "Task",
    description:
      "Page showing powder sample and explaining how our task is to weigh around 0.5 g of that powder sample",
    directions: "Our task is to weigh around 0.5g of the powder sample.",
    user_instructions: "Weigh the powder sample using the analytical balance.",
    objectsInFocus: [
      {
        name: "Sample Bottle",
        model: SampleBottleModel,
        actions: [
          {
            // performAction: () => {
            //   console.log("Performing open bottle action");
            //   // openBottle function needs to be defined elsewhere
            //   openBottle();
            // },
            actionName: "open",
            hitbox: {
              position: [0, 2, 0],
              scale: 3,
            },
          },
        ],
        modelProps: {
          position: {
            startingPosition: { x: 50, y: 50 },
            endingPosition: { x: 50, y: 50 },
          },
          scale: 1.3,
          opacity: 0.8,
          rotation: [0, (3.14 / 180) * 90, 0], // Example rotation
        },
      },
    ],
    interactiveElements: [
      {
        type: "quiz",
        question: "How much of the powder sample are you supposed to weigh?",
        options: ["0.3g", "0.5g", "0.7g"],
        correctAnswer: "0.5g",
      },
    ],
  },
  
  // Additional steps...
];
