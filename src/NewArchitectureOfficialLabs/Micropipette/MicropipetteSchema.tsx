
import { BeakerModel } from "~/Models/BeakerModel"; // Make sure to replace with the correct import path for your models
import { MicropipetteTipBoxP200Model } from "~/Models/MicropipetteTipBoxP200";
import { LabSchema } from "~/utils/types/types";

const MicropipetteLabSchema: LabSchema = [
  {
    stepTitle: "Introduction to the lab",
    description: "Welcome to the pipetting lab. In this lab, we will practice proper micropipetting techniques.",
    directions: "Introduction to the lab",
    user_instructions: "",
    labObjects: [{
        name: "MicropipetteTipBoxP200",
        model: MicropipetteTipBoxP200Model,
        actions: [
          {
            actionName: "move",
            hitbox: {
              position: [0, 1, 2],
              scale: 1,
            },
            timeline: {
                defaults: {},  // should typically be empty; can use it to pass in parameters to gsap.timeline() if needed
              sequence: [
                { props: { y: "-=1", duration: 1 } } // Moves the beaker upwards
              ],
            },
            auto: false
          },
        ],
        modelProps: {
          startingPosition: [0, 0, 0],
          scale: 5,
          opacity: 1,
          rotation: [0, 0, 0],
        },
      },
    {
      name: "Beaker",
      model: BeakerModel,
      modelProps: {
        scale: 5,
        opacity: 0.9,
        rotation: [0, 0, 0],
        startingPosition: [0, 0, 0],
      },
      actions: [
        {
          actionName: "move",
          auto: true,
          timeline: {
            defaults: {},
            sequence: [
              { props: { duration: 4 }, },
              { props: { y: "+=1", z: "+=2", duration: 1 }, },
            ],
          }
        }
      ]
    }],
    interactiveElements: []
  },
  {
    stepTitle: "Micropipette Selection",
    description: "Select the micropipette that will be used",
    directions: "Our first task will be to select the appropriate micropipette.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Volume Identification",
    description: "Understanding micropipette volume ranges",
    directions: "Micropipettes are calibrated to different ranges. 0.2-2ul for P2 pipettes, 2ul-20ul for P20 pipettes, 20-200ul for P200 pipettes, and 200ul-1000ul for P1000 pipettes.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Volume Selection",
    description: "",
    directions: "Now, we'll give you a volume in microliters and you will need to identify which pipette would be appropriate to extract that volume.",
    user_instructions: "Hint: the pipette type is always given on the top of the push button.",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Set Pipette Volume",
    description: "Instruct user on how to set the pipette volume",
    directions: "Good job! Now let's work on setting the volume on the pipette!",
    user_instructions: "Remember, rotating clockwise (to the right) increases volume, whereas rotating counterclockwise (to the left) decreases the volume.",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Tip Selection and Attachment",
    description: "Instruct user on how to select the right tip and attach it to the pipette",
    directions: "Good Job! Now let us look at identifying the correct tip holder box. Select the appropriate tip. Well done! Let's now attach the tip.",
    user_instructions: "Move the joystick down until the pipette hits the tip box to attach the tip to the pipette!",
    labObjects: [
    ],
    interactiveElements: []
  },
  // Additional steps would continue here...
];

export default MicropipetteLabSchema;
