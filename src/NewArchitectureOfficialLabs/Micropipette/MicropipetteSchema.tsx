import { BeakerModel } from "~/Models/BeakerModel"; // Make sure to replace with the correct import path for your models
import { MicropipetteTipBoxP200Model } from "~/Models/MicropipetteTipBoxP200";
import { LabSchema } from "~/utils/types/types";
import CustomStepSample from "./CustomSteps/CustomStepSample";
import { MicropipetteP2Model } from "~/Models/MicropipetteP2";
import SetVolumeCustomStep from "./CustomSteps/SetVolumeCustomStep";
import { PipetteStandModel } from "~/MicropipetteLab/components/PipetteStand";
import { RedP2MicropipetteModel } from "~/MicropipetteLab/components/RedP2Micropipette";
import { OrangeP20MicropipetteModel } from "~/MicropipetteLab/components/OrangeP20Micropipette";
import { YellowP200MicropipetteModel } from "~/MicropipetteLab/components/YellowP200Micropipette";
import { BlueP1000MicropipetteModel } from "~/MicropipetteLab/components/BlueP1000Micropipette";
import SelectRightPipetteCustomStep from "./CustomSteps/SelectRightPipette";
import { RedP2TipBoxModel } from "~/MicropipetteLab/components/RedP2TipBox";
import { OrangeP20TipBoxModel } from "~/MicropipetteLab/components/OrangeP20TipBox";
import { YellowP200TipBoxModel } from "~/MicropipetteLab/components/YellowP200TipBox";
import { BlueP1000TipBoxModel } from "~/MicropipetteLab/components/BlueP1000TipBox";
import SelectRightTipBox from "./CustomSteps/SelectRightTipBox";
import PushPipetteIntoTipBox from "./CustomSteps/PushPipetteIntoTipBox";
import { BeakerFillWithOrganicLayer } from "~/SeperatingLiquidsLab/components/BeakerFillingWithOrganicProduct";
import { BeakerWithOrangeReagnentModel } from "~/MicropipetteLab/components/BeakerWithOrangeReagnent";
import AdjustPlungerSlider from "./CustomSteps/AdjustPlungerSlider";
import InsertTipIntoLiquid from "./CustomSteps/InsertTipIntoLiquid";
import ExtractLiquidSlider from "./CustomSteps/ExtractLiquidSlider";
import DumpLiquidIntoBeaker from "./CustomSteps/DumpLiquidIntoBeaker";
import { WasteDisposalBoxModel } from "~/MicropipetteLab/components/WasteDisposalBox";
import ExpelTipIntoWasteBox from "./CustomSteps/ExpelTipIntoWasteBox";

const MicropipetteLabSchema: LabSchema = [
  {
    stepTitle: "Introduction to the lab",
    description:
      "Welcome to the pipetting lab. In this lab, we will practice proper micropipetting techniques.",
    directions: "Introduction to the lab",
    user_instructions: "",
    labObjects: [
      {
        name: "TipBox",
        model: RedP2TipBoxModel,
        actions: [
          // no actions atm
        ],
        modelProps: {
          startingPosition: [0, 0.5, 5.5],
          scale: 4.5,
          opacity: 1,
          rotation: [0, 0, 0],
        },
      },
      {
        name: "PipetteStand",
        model: PipetteStandModel,
        actions: [
          // {
          //   actionName: "move",
          //   hitbox: {
          //     position: [0, 0, 0],
          //     scale: 1,
          //   },
          //   timeline: {
          //       defaults: {},  // should typically be empty; can use it to pass in parameters to gsap.timeline() if needed
          //     sequence: [
          //       { props: { y: "+=1", duration: 1 } } // Moves the beaker upwards
          //     ],
          //   },
          //   auto: false
          // }
        ],
        modelProps: {
          startingPosition: [2, 0.7, 2.5],
          scale: 4.5,
          opacity: 1,
          rotation: [4.7, 0, 1.57],
        },
      },
      {
        name: "P2MicroPipette",
        model: MicropipetteP2Model,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.5, 0.85],
          scale: 7,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      },
      {
        name: "P20MicroPipette",
        model: OrangeP20MicropipetteModel,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.45, -0.1],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      },
      {
        name: "P200MicroPipette",
        model: YellowP200MicropipetteModel,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.45, -1.1],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      },
      {
        name: "P1000MicroPipette",
        model: BlueP1000MicropipetteModel,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.45, -2.1],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      }],
    interactiveElements: []
  },
  {
    stepTitle: "Micropipette Selection",
    description: "Select the micropipette that will be used",
    directions:
      "Our first task will be to select the appropriate micropipette.",
    user_instructions: "",
    labObjects: [{
        name: "PipetteStand",
        model: PipetteStandModel,
        actions: [
          // {
          //   actionName: "move",
          //   hitbox: {
          //     position: [0, 0, 0],
          //     scale: 1,
          //   },
          //   timeline: {
          //       defaults: {},  // should typically be empty; can use it to pass in parameters to gsap.timeline() if needed
          //     sequence: [
          //       { props: { y: "+=1", duration: 1 } } // Moves the beaker upwards
          //     ],
          //   },
          //   auto: false
          // }
        ],
        modelProps: {
          startingPosition: [2, 0.7, 2.5],
          scale: 4.5,
          opacity: 1,
          rotation: [4.7, 0, 1.57],
        },
      },
      {
        name: "P2MicroPipette",
        model: MicropipetteP2Model,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.5, 0.85],
          scale: 7,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      },
      {
        name: "P20MicroPipette",
        model: OrangeP20MicropipetteModel,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.45, -0.1],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      },
      {
        name: "P200MicroPipette",
        model: YellowP200MicropipetteModel,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.45, -1.1],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      },
      {
        name: "P1000MicroPipette",
        model: BlueP1000MicropipetteModel,
        actions: [
           // no actions atm
        ],
        modelProps: {
          startingPosition: [-0.4, 5.45, -2.1],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0.4],
        }
      }],
    interactiveElements: [],
  },
  {
    stepTitle: "Volume Identification",
    description: "Understanding micropipette volume ranges",
    directions:
      "Micropipettes are calibrated to different ranges. 0.2-2ul for P2 pipettes, 2ul-20ul for P20 pipettes, 20-200ul for P200 pipettes, and 200ul-1000ul for P1000 pipettes.",
    user_instructions: "",
    labObjects: [{
      name: "PipetteStand",
      model: PipetteStandModel,
      actions: [
        // {
        //   actionName: "move",
        //   hitbox: {
        //     position: [0, 0, 0],
        //     scale: 1,
        //   },
        //   timeline: {
        //       defaults: {},  // should typically be empty; can use it to pass in parameters to gsap.timeline() if needed
        //     sequence: [
        //       { props: { y: "+=1", duration: 1 } } // Moves the beaker upwards
        //     ],
        //   },
        //   auto: false
        // }
      ],
      modelProps: {
        startingPosition: [2, 0.7, 2.5],
        scale: 4.5,
        opacity: 1,
        rotation: [4.7, 0, 1.57],
      },
    },
    {
      name: "P2MicroPipette",
      model: MicropipetteP2Model,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.5, 0.85],
        scale: 7,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P20MicroPipette",
      model: OrangeP20MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -0.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P200MicroPipette",
      model: YellowP200MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -1.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P1000MicroPipette",
      model: BlueP1000MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -2.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    }],
    interactiveElements: [],
  },
  {
    stepTitle: "Volume Selection",
    description: "",
    directions:
      "Now, we'll give you a volume in microliters and you will need to identify which pipette would be appropriate to extract that volume.",
    user_instructions:
      "Hint: the pipette type is always given on the top of the push button.",
    labObjects: [{
      name: "PipetteStand",
      model: PipetteStandModel,
      actions: [
        // {
        //   actionName: "move",
        //   hitbox: {
        //     position: [0, 0, 0],
        //     scale: 1,
        //   },
        //   timeline: {
        //       defaults: {},  // should typically be empty; can use it to pass in parameters to gsap.timeline() if needed
        //     sequence: [
        //       { props: { y: "+=1", duration: 1 } } // Moves the beaker upwards
        //     ],
        //   },
        //   auto: false
        // }
      ],
      modelProps: {
        startingPosition: [2, 0.7, 2.5],
        scale: 4.5,
        opacity: 1,
        rotation: [4.7, 0, 1.57],
      },
    },
    {
      name: "P2MicroPipette",
      model: MicropipetteP2Model,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.5, 0.85],
        scale: 7,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P20MicroPipette",
      model: OrangeP20MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -0.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P200MicroPipette",
      model: YellowP200MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -1.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P1000MicroPipette",
      model: BlueP1000MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -2.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    }],
    interactiveElements: [],
  },
  {
    stepTitle: "Select Correct Pipette",
    description: "",
    directions: "Click the appropriate pipette for the given volume: 1ul.",
    user_instructions:
      "Hint: Try rotating your camera to view the top of the pipette to see their volume!",
    labObjects: [{
      name: "PipetteStand",
      model: PipetteStandModel,
      actions: [
        // {
        //   actionName: "move",
        //   hitbox: {
        //     position: [0, 0, 0],
        //     scale: 1,
        //   },
        //   timeline: {
        //       defaults: {},  // should typically be empty; can use it to pass in parameters to gsap.timeline() if needed
        //     sequence: [
        //       { props: { y: "+=1", duration: 1 } } // Moves the beaker upwards
        //     ],
        //   },
        //   auto: false
        // }
      ],
      modelProps: {
        startingPosition: [2, 0.7, 2.5],
        scale: 4.5,
        opacity: 1,
        rotation: [4.7, 0, 1.57],
      },
    },
    {
      name: "P2MicroPipette",
      model: MicropipetteP2Model,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.5, 0.85],
        scale: 7,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P20MicroPipette",
      model: OrangeP20MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -0.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P200MicroPipette",
      model: YellowP200MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -1.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    },
    {
      name: "P1000MicroPipette",
      model: BlueP1000MicropipetteModel,
      actions: [
         // no actions atm
      ],
      modelProps: {
        startingPosition: [-0.4, 5.45, -2.1],
        scale: 4,
        opacity: 1,
        rotation: [0, 0, 0.4],
      }
    }],
    interactiveElements: [],
    customStep: SelectRightPipetteCustomStep
  },
  {
    stepTitle: "Set Pipette Volume",
    description: "Instruct user on how to set the pipette volume",
    directions:
      "Good job! Now let's work on setting the volume on the pipette!",
    user_instructions:
      "Remember, rotating clockwise (to the right) increases volume, whereas rotating counterclockwise (to the left) decreases the volume.",
    labObjects: [
      {
        name: "Micropipette",
        model: MicropipetteP2Model,
        modelProps: {
          startingPosition: [0, 2, 0],
          scale: 5,
          opacity: 1,
          rotation: [0, 3.14 * 180 / 180, 0],
        },
        actions: []
        }
    ],
    interactiveElements: [],
  },
  {
    stepTitle:
      "Set Pipette Volume",
    description: "Instruct user to set the pipette volume",
    directions: "Set the volume of the pipette to extract 1ul.",
    user_instructions:
      "Use the buttons to adjust the volume of the pipette.",
    labObjects: [],
    interactiveElements: [],
    customStep: SetVolumeCustomStep
  },
  {
    stepTitle: "Tip Selection and Attachment",
    description:
      "Instruct user on how to select the right tip and attach it to the pipette",
    directions:
      "Good Job! Now let us look at identifying the correct tip holder box.",
    labObjects: [{
      name: "Micropipette",
      model: MicropipetteP2Model,
      modelProps: {
        startingPosition: [0, 4, 0.4],
        scale: 5,
        opacity: 1,
        rotation: [0, 3.14 * 180 / 180, 0],
      },
      actions: []
      },
      {
        name: "RedP2TipBox",
        model: RedP2TipBoxModel,
        modelProps: {
          startingPosition: [1, 0.5, 5],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0],
        },
        actions: []
      },
      {
        name: "OrangeP20TipBox",
        model: OrangeP20TipBoxModel,
        modelProps: {
          startingPosition: [1, 0.5, 2.5],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0],
        },
        actions: []
      },
      {
        name: "YellowP200TipBox",
        model: YellowP200TipBoxModel,
        modelProps: {
          startingPosition: [1, 0.5, -0.1],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0],
        },
        actions: []
      },
      {
        name: "BlueP1000TipBox",
        model: BlueP1000TipBoxModel,
        modelProps: {
          startingPosition: [1, 0.5, -2.7],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0],
        },
        actions: []
      }],
    interactiveElements: [],
  },
  {
    stepTitle:
      "Tip Selection and Attachment",
    description:
      "Instruct user on how to select the right tip and attach it to the pipette",
    directions:
      "Different micropipettes require different-sized disposable tips. Red = P2, Orange = P20, Yellow = P200, Blue = P1OOO.",
    user_instructions:
      "Please click on the appropriate tip. Hint: we selected a P2 micropipette!",
    labObjects: [],
    interactiveElements: [],
    customStep: SelectRightTipBox
  },
  {
    stepTitle: "Attach Tip",
    description:
      "Instruct user on how to select the right tip and attach it to the pipette",
    directions:
      "Well done! Let's now attach the tip. To attach the pipette tip you must simply push the pipette into the tip holder until the tip is attached.",
    user_instructions:
      "Click on the Micropipette to attach the tip to the pipette!",
    labObjects: [{
      name: "Micropipette",
      model: MicropipetteP2Model,
      modelProps: {
        startingPosition: [0, 4, 0.4],
        scale: 5,
        opacity: 1,
        rotation: [0, 3.14 * 180 / 180, 0],
      },
      actions: []
      },
      {
        name: "RedP2TipBox",
        model: RedP2TipBoxModel,
        modelProps: {
          startingPosition: [-0.5, 0.5, 1.2],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0],
        },
        actions: []
      }
    ],
    interactiveElements: [],
    customStep: PushPipetteIntoTipBox
  },
  {
    stepTitle: "Extracting Liquid",
    description: "Instruct user on how to extract liquid.",
    directions:
      "Awesome! Now that we have set the volume on the pipette we can now look at extracting the given volume of a reagent.",
    labObjects: [{
      name: "Micropipette",
      model: RedP2MicropipetteModel,
      modelProps: {
        startingPosition: [0, 2, 0.55],
        scale: 0.5,
        opacity: 1,
        rotation: [0, 3.14 * 180 / 180, 0],
      },
      actions: []
      },
      {
        name: "Beaker With Reagnent",
        model: BeakerWithOrangeReagnentModel,
        modelProps: {
          startingPosition: [0, 0.55, 0.4],
          scale: 3,
          opacity: 1,
          rotation: [0, 9.5, 0],
        },
        actions: []
      }],
    interactiveElements: [],
  },
  {
    stepTitle: "Extracting Liquid",

    description: "Instruct user on how the plunger works in the pipette",
    directions: "To extract liquid, first press the plunger to the first stop.",
    user_instructions:
      "Use the slider to move the plunger down to the first stop.",
    labObjects: [{
      name: "Micropipette",
      model: RedP2MicropipetteModel,
      modelProps: {
        startingPosition: [0, 2, 0.55],
        scale: 0.5,
        opacity: 1,
        rotation: [0, 3.14 * 180 / 180, 0],
      },
      actions: []
      },
      {
        name: "Beaker With Reagnent",
        model: BeakerWithOrangeReagnentModel,
        modelProps: {
          startingPosition: [0, 0.55, 0.4],
          scale: 3,
          opacity: 1,
          rotation: [0, 9.5, 0],
        },
        actions: []
      }],
    interactiveElements: [],
    customStep: AdjustPlungerSlider
  },
  {
    stepTitle: "Extracting Liquid",
    description:
      "Instruct user on how to properly insert the pipette into the liquid.",
    directions:
      "While holding the plunger, insert the tip into the liquid just below the meniscus.",
    user_instructions:
      "Click on the Micropipette until the pipette tip moves into the liquid.",
    labObjects: [],
    interactiveElements: [],
    customStep: InsertTipIntoLiquid
  },
  {
    stepTitle: "Extracting Liquid",
    description: "Instruct user on how to extract liquid.",
    directions:
      "Then, we release the push button slowly to start extracting the liquid.",
    user_instructions:
      "Slowly move the slider up to it's original position to draw up the liquid",
    labObjects: [],
    interactiveElements: [],
    customStep: ExtractLiquidSlider
  },
  {
    stepTitle: "Transferring Liquid",
    description: "Instruct user on how to transfer liquid.",
    directions:
      "Good job! Now that we've extracted the liquid, let us dump the liquid out into this beaker.",
    user_instructions:
      "Use the slider to press the plunger all the way to the second stop and slowly release to expel the liquid.",
    labObjects: [],
    interactiveElements: [],
    customStep: DumpLiquidIntoBeaker
  },
  {
    stepTitle: "Disposing Tip",
    description:
      "Instruct user on best practices for disposing of the pipette tip.",
    directions:
      "Almost there! Now, all we have left to do is dispose of the pipette tip! After using your pipette it is always good practice to eject the tip into an appropriate waste disposal box.",
    labObjects: [{
      name: "Micropipette",
      model: RedP2MicropipetteModel,
      modelProps: {
        startingPosition: [0, 2, 0.55],
        scale: 0.5,
        opacity: 1,
        rotation: [0, 3.14 * 180 / 180, 0],
      },
      actions: []
      },
      {
        name: "Waste Disposal Box",
        model: WasteDisposalBoxModel,
        modelProps: {
          startingPosition: [0, 1, 0.4],
          scale: 1.5,
          opacity: 1,
          rotation: [0, -4.7, 0],
        },
        actions: []
      }],
    interactiveElements: [],
  },
  {
    stepTitle: "Eject Tip",
    description: "Instruct user on how to eject the tip.",
    directions:
      "To eject the tip you must push down on the tip ejector button shown on the pipette.",
    user_instructions:
      "Use the slider to push down all the way and eject the pipette tip!",
    labObjects: [],
    interactiveElements: [],
    customStep: ExpelTipIntoWasteBox
  },
  {
    stepTitle: "Conclusion",
    description: "The lab is finished.",
    directions:
      "Great work scientist! You have now learned the basics of using a micropipette!",
    user_instructions: "You have completed the lab!",
    labObjects: [{
      name: "Micropipette",
      model: RedP2MicropipetteModel,
      modelProps: {
        startingPosition: [0, 0, 4],
        scale: 0.5,
        opacity: 1,
        rotation: [0, 3.14 * 180 / 180, 0],
      },
      actions: []
      },
      {
        name: "Waste Disposal Box",
        model: WasteDisposalBoxModel,
        modelProps: {
          startingPosition: [0, 1, -3],
          scale: 1.5,
          opacity: 1,
          rotation: [0, -4.7, 0],
        },
        actions: []
      },
      {
        name: "RedP2TipBox",
        model: RedP2TipBoxModel,
        modelProps: {
          startingPosition: [-0.5, 0.5, 2.5],
          scale: 4,
          opacity: 1,
          rotation: [0, 0, 0],
        },
        actions: []
      },
      {
        name: "Beaker With Reagnent",
        model: BeakerWithOrangeReagnentModel,
        modelProps: {
          startingPosition: [0, 0.55, -0.7],
          scale: 3,
          opacity: 1,
          rotation: [0, 9.5, 0],
        },
        actions: []
      }],
    interactiveElements: [],
  },

  // Additional steps would continue here...
];

export default MicropipetteLabSchema;
