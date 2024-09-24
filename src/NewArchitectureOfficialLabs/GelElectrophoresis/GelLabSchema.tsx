import { LabSchema } from "~/utils/types/types";

const ElectrophoresisLabSchema: LabSchema = [
  {
    stepTitle: "Welcome User",
    description: "Introduces user to the lab. Includes UI diagram of adjusting table size, rotation, and position.",
    directions: "Welcome to the agarose gel electrophoresis lab! In this short lab module we will be going through all the steps required to perform a successful agarose gel electrophoresis lab!",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Select Inventory Items",
    description: "Guides the user to select necessary items from inventory.",
    directions: "We need to gather several materials from the inventory. Open the inventory on the top right and select the following items one by one: electrophoresis tank, gel comb, blockers, gel holder, and 1% agarose solution.",
    user_instructions: "Choose each item from the inventory.",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Materials Ready",
    description: "Confirms to the user that all materials have been gathered.",
    directions: "Good selecting, scientist! Now that we have all the materials, we can set up the gel tank.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Add Gel Holder and Blockers",
    description: "Guides user to place gel holder and blockers in the correct positions.",
    directions: "Our first step would be to add the gel holder into the center of the tank and then place the blockers on the sides.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Directions on DNA Being Negatively Changed",
    description: "Informs user on the negative charge of DNA.",
    directions: "DNA is negatively charged which means that it would get sucked to the positive electrode. Therefore, in order for the DNA to show up in the gel, we need to make sure that the comb (in which we will eventually add in the DNA samples) is placed on the side of the NEGATIVE electrode.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Place Comb",
    description: "Prompts user to place comb in the right location. TBA: include feedback if user places comb incorrectly on the positive end.",
    directions: "Choose the correct location to place the comb.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Pour Agarose Solution",
    description: "Guides user to pour the agarose solution into the tank center.",
    directions: "Great stuff! Now we can safely pour in the 1% agarose solution into the tank center.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Wait for Gel",
    description: "Tells user to wait about 10 minutes for the gel to set in place.",
    directions: "Now we wait for about 10 minutes for the gel to set before moving on to the next steps.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Prepare Buffer Solution",
    description: "Remove blockers, acquire and pour buffer solution.",
    directions: "Remove blockers, select buffer from inventory, and pour into the tank.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Fill With Buffer",
    description: "Prompts user to press a button to fill up the tank with the buffer until the limit is reached. A checkmark icon appears when the limit is reached.",
    directions: "Hold the \"Fill up\" button to pour in the buffer up to the limit.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Remove Comb",
    description: "Prompts user to remove comb from the gel tank.",
    directions: "Great work, now we remove the comb and we are ready to fill in the DNA solution.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Prepare DNA Sample",
    description: "Acquire appropriate pipette and 10uL of DNA solution.",
    directions: "Acquire the pipette and 10uL of DNA solution.",
    user_instructions: "Open inventory, acquire pipette and 10uL of DNA solution.",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Acquire Mystery Item",
    description: "Prompts user to acquire mystery item from the inventory that goes with the pipette. This item is the pipette tip holder.",
    directions: "Great! Is there anything else we need with the pipette?",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Insert DNA Samples",
    description: "Prompt user to use pipette with a tip to extract 10 uL of DNA solution and insert it into each hole created by the combs.",
    directions: "Awesome stuff! Now we just extract 10 uL of the DNA sample and carefully insert it into each of the holes in the gel created by the combs.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Insert Into Well",
    description: "Prompts user to use a joystick to move the pipette tip into the gel wall without breaking anything. A checkmark UI will appear once this is done.",
    directions: "Now use the joystick on the right to move the pipette tip into the gel well without the tip hitting the edges.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Power Source Info",
    description: "Tells user that the power source should be attached now.",
    directions: "That was amazing! Now we are ready to attach the power source to the tank and begin the electrophoresis process.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Acquire Power Source",
    description: "Prompts user to open the inventory and acquire the power source.",
    directions: "Go to the inventory and select the power source.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Attach Power Source",
    description: "Prompts user to attach the power source to the tank and switch it on.",
    directions: "Great stuff! Now we attach the power source to the tank and switch it on.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Set Voltage",
    description: "Prompts user to set the voltage of the power source to 100 Volts. This is set through up and down arrow icons, and the user presses a running man icon to proceed once the voltage is correct.",
    directions: "Set the voltage of the power source to 100 Volts. Hit the running man to start the power flow.",
    user_instructions: "",
    labObjects: [],
    interactiveElements: []
  },
  {
    stepTitle: "Completion",
    description: "Tells user the lab is complete. A UI panel pops up on the screen saying the lab is complete after the next step button is pressed.",
    directions: "That was fantastic! Now watch the gel electrophoresis unfold!",
    user_instructions: "You have completed the lab!",
    labObjects: [],
    interactiveElements: []
  },
];

export default ElectrophoresisLabSchema;
