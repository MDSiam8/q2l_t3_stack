import { BeakerModel } from "~/Models/BeakerModel"; // Make sure to replace with the correct import path for your models
import { LabSchema } from "~/utils/types/types";

const MicropipetteLabSchema: LabSchema = [
  {
    stepTitle: "Introduction to the lab",
    description:
      "Welcome to the pipetting lab. In this lab, we will practice proper micropipetting techniques.",
    directions: "Introduction to the lab",
    user_instructions: "",
    labObjects: [
      {
        name: "Beaker",
        model: BeakerModel,
        actions: [
          {
            actionName: "move",
            hitbox: {
              position: [0, 0, 0],
              scale: 1,
            },
            timeline: {
              defaults: {}, // should typically be empty; can use it to pass in parameters to gsap.timeline() if needed
              sequence: [
                { props: { y: "+=1", duration: 1 } }, // Moves the beaker upwards
              ],
            },
            auto: false,
          },
        ],
        modelProps: {
          startingPosition: [0, 0, 0],
          scale: 5,
          opacity: 1,
          rotation: [0, 0, 0],
        },
      },
    ],
    interactiveElements: [],
  },
  {
    stepTitle: "Micropipette Selection",
    description: "Select the micropipette that will be used",
    directions:
      "Our first task will be to select the appropriate micropipette.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Volume Identification",
    description: "Understanding micropipette volume ranges",
    directions:
      "Micropipettes are calibrated to different ranges. 0.2-2ul for P2 pipettes, 2ul-20ul for P20 pipettes, 20-200ul for P200 pipettes, and 200ul-1000ul for P1000 pipettes.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Volume Selection",
    description: "",
    directions:
      "Now, we'll give you a volume in microliters and you will need to identify which pipette would be appropriate to extract that volume.",
    user_instructions:
      "Hint: the pipette type is always given on the top of the push button.",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Select Right Pipette. USE CUSTOM STEP FOR THIS ONE.",
    description: "",
    directions: "Select the appropriate pipette for the given volume: 1ul.",
    user_instructions:
      "Hint: Try rotating your camera to view the top of the pipette to see their volume!",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Set Pipette Volume",
    description: "Instruct user on how to set the pipette volume",
    directions:
      "Good job! Now let's work on setting the volume on the pipette!",
    user_instructions:
      "Remember, rotating clockwise (to the right) increases volume, whereas rotating counterclockwise (to the left) decreases the volume.",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Set Pipette Volume, USE CUSTOM STEP. We should have a overlay that simulates a display reading overlayed on the pipette",
    description: "Instruct user to set the pipette volume",
    directions: "Set the volume of the pipette to extract 1ul.",
    user_instructions:
      "Use the right arrow to rotate the push button counterclockwise and the left arrow to rotate the push button clockwise.",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Tip Selection and Attachment",
    description:
      "Instruct user on how to select the right tip and attach it to the pipette",
    directions:
      "Good Job! Now let us look at identifying the correct tip holder box.",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Tip Selection and Attachment - WE WILL USE CUSTOM STEP FOR THIS.",
    description:
      "Instruct user on how to select the right tip and attach it to the pipette",
    directions:
      "Different micropipettes require different-sized disposable tips. Red = P2, Orange = P20, Yellow = P200, Blue = P1OOO.",
    user_instructions:
      "Please select the appropriate tip. Hint: we selected a P2 micropipette!",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Attach Tip",
    description:
      "Instruct user on how to select the right tip and attach it to the pipette",
    directions:
      "Well done! Let's now attach the tip. To attach the pipette tip you must simply push the pipette into the tip holder until the tip is attached.",
    user_instructions:
      "Click on the Micropipette to attach the tip to the pipette!",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Extracting Liquid",
    description: "Instruct user on how to extract liquid.",
    directions:
      "Awesome! Now that we have set the volume on the pipette we can now look at extracting the given volume of a reagent.",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Extracting Liquid",

    description: "Instruct user on how the plunger works in the pipette",
    directions: "To extract liquid, first press the plunger to the first stop.",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Extracting Liquid",
    description:
      "Instruct user on how to properly insert the pipette into the liquid.",
    directions:
      "While holding the plunger, insert the tip into the liquid just below the meniscus.",
    user_instructions:
      "Click on the Micropipette until the pipette hits the tip box to attach the tip to the pipette!",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Extracting Liquid",
    description: "Instruct user on how to extract liquid.",
    directions:
      "Then, we release the push button slowly to start extracting the liquid.",
    user_instructions:
      "Click on the Micropipette until the pipette hits the tip box to attach the tip to the pipette!",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Transferring Liquid",
    description: "Instruct user on how to transfer liquid.",
    directions:
      "Good job! Now that we've extracted the liquid, let us dump the liquid out into this beaker.",
    user_instructions:
      "Click on the Micropipette until the pipette hits the tip box to attach the tip to the pipette!",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Disposing Tip",
    description:
      "Instruct user on best practices for disposing of the pipette tip.",
    directions:
      "Almost there! Now, all we have left to do is dispose of the pipette tip! After using your pipette it is always good practice to eject the tip into an appropriate waste disposal box.",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Eject Tip",
    description: "Instruct user on how to eject the tip.",
    directions:
      "To eject the tip you must push down on the tip ejector button shown on the pipette.",
    user_instructions:
      "Use the joystick to push down on the tip ejector and eject the pipette tip!",
    labObjects: [],
    interactiveElements: [],
  },
  {
    stepTitle: "Conclusion",
    description: "The lab is finished.",
    directions:
      "Great work scientist! You have now learned the basics of using a micropipette!",
    user_instructions: "You have completed the lab!",
    labObjects: [],
    interactiveElements: [],
  },

  // Additional steps would continue here...
];

export default MicropipetteLabSchema;
