import {
  LabSchema,
  LabObject,
  InteractiveElement,
} from "../utils/types/types";
import { BeakerModel } from "~/Models/BeakerModel";

export const SampleBeakerLabSchema: LabSchema = [
  {
    stepTitle: "Lab Objectives",
    description: "Simply a starting page describing what we'll do in this lab",
    directions: "In this lab, you will learn how to use a beaker.",
    user_instructions:
      "Please familiarize yourself with the beaker.",
    labObjects: [
      {
        name: "Beaker",
        model: BeakerModel,
        actions: [
          {
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
            auto: false
          },
          
        ],
        modelProps: {
          startingPosition: [2, 2, 2],
          scale: 4,
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
  // Additional steps...
];
