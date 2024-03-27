import FourthStepComponent from "~/AnalyticalBalanceLab/components/steps/FourthStepComponent";
import {
  LabSchema,
  LabObject,
  InteractiveElement,
} from "../utils/types/types";
import { AnalyticalBalanceModel } from "~/Models/AnalyticalBalanceModel";
import { SampleBottleModel } from "~/Models/SampleBottleModel";
import FirstStepComponent from "~/AnalyticalBalanceLab/components/steps/FirstStepComponent";


export const AnalyticalBalanceLabSchema: LabSchema = [
  {
    stepTitle: "Lab Objectives",
    description: "Simply a starting page describing what we'll do in this lab",
    directions: "In this lab, you will learn how to use an analytical balance.",
    user_instructions:
      "Please familiarize yourself with the analytical balance.",
    labObjects: [
      {
        name: "Analytical Balance",
        model: AnalyticalBalanceModel,
        actions: [
          {
            // actionName: "open",
            actionName: "move",
            hitbox: {
              position: [0, 0, 0],
              scale: 3,
            },
            timeline: {
              defaults: {},
              sequence: [
                { props: { y: "+=4", duration: 1 } },
                { props: { x: "+=.2", z: "-=2.6", duration: 1 } }, // Move right
              ],
            },
          },
          
        ],
        modelProps: {
          startingPosition: [2, 0, 0],
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
    labObjects: [
      {
        name: "Sample Bottle",
        model: SampleBottleModel,
        actions: [
          {
            actionName: "move",
            timeline: {
              defaults: {},
              sequence: [
                { props: { y: "+=4", duration: 1 } },
                { props: { x: "+=.2", z: "-=2.6", duration: 1 } }, // Move right
              ],
            },
          },
        ],
        modelProps: {
          startingPosition: [3, 3, 0],
          scale: 1.3,
          opacity: 0.8,
          rotation: [0, (3.14 / 180) * 90, 0], // Example rotation
        },
      },
      {
        name: "Analytical Balance",
        model: AnalyticalBalanceModel,
        actions: [
          {
            actionName: "move",
            timeline: {
              defaults: { delay: 0 },
              sequence: [
                { props: { y: "+=4", duration: 1 } },
                { props: { x: "+=.2", z: "-=2.6", duration: 1 } }, // Move right
              ],
            },
          },
        ],
        modelProps: {
          startingPosition: [2, 0, 0],
          isOpen: false,
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
// New custom step
{
  stepTitle: "Custom Interactive Step",
  description: "A custom step involving an interactive component.",
  directions: "Follow the instructions in the custom component.",
  user_instructions: "Interact with the custom component as directed.",
  labObjects: [], // Assuming no specific objects are in focus for this step
  interactiveElements: [], // Assuming the custom component handles its interaction
  customStep: FourthStepComponent, // Assuming GenericCustomStep is a previously defined or imported component
},
  // Additional steps...
];
