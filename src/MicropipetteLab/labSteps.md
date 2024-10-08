# Micropipette Lab JSON Steps Draft

## Template:
"1":{
    "stepTitle": "",
    "description": "",
    "directions": "",
    "user_instructions": "", 
    "objectsInFocus": [""]
}

### Clarifications:
directions: Main prompt directions to the user.
user_instructions: More specific instructions on functionality or guidance, usually shown in a seperate prompt (e.g., press this button)

## Micropipette Lab Steps:

"1":{
    "stepTitle": "Setup",
    "description": "Placing lab into virtual environment",
    "directions": "Tap on the screen to place the lab onto the floor",
    "user_instructions": "", 
    "objectsInFocus": ["labBaseplate"]
}
"2":{
    "stepTitle": "",
    "description": "Introduction to the lab",
    "directions": "Welcome to the pipetting lab. In this lab, we will practice proper micropipetting techniques",
    "user_instructions": "", 
    "objectsInFocus": ["pipetteP2", "pipetteP20","pipetteP200","pipetteP1000","micropipetteStation", "micropipetteChart"]
}
"3":{
    "stepTitle": "Micropipette Selection",
    "description": "Select the micropipette that will be used",
    "directions": "Our first task will be to select the appropriate micro pipette",
    "user_instructions": "", 
    "objectsInFocus": []
}
"4":{
    "stepTitle": "",
    "description": "",
    "directions": "Micropipettes are calibrated to different ranges. 0.2-2ul for a P2 pipette, 2ul-20ul for a P20 pipette, 20-200ul for a P200 pipette, and a 200ul-1000ul for a P1000 pipette",
    "user_instructions": "", 
    "objectsInFocus": []
}
"5":{
    "stepTitle": "",
    "description": "",
    "directions": "Now, we will give you a volume in microliters and you will need to identify which pipette would be appropriate to extract that volume.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"6":{
    "stepTitle": "",
    "description": "",
    "directions": "Hint: the pipette type is always given on the top of the push button",
    "user_instructions": "", 
    "objectsInFocus": ["pointingArrows"]
}
"7":{
    "stepTitle": "",
    "description": "",
    "directions": "Select the appropriate pipette for the given volume. (Hint: you can use the slider on the right to rotate the pipettes to see their push button.)",
    "user_instructions": "Target volume: 1ul", 
    "objectsInFocus": []
}
"8":{
    "stepTitle": "Set pipette volume",
    "description": "Instruct user on how to set the pipette volume",
    "directions": "Good job! Now let us work on setting the volume on the pipette!",
    "user_instructions": "",
    "objectsInFocus": []
}
"9":{
    "stepTitle": "",
    "description": "",
    "directions": "To set the volume use the joystick to rotate the push button to the target volume.",
    "user_instructions": "",
    "objectsInFocus": []
}
"10":{
    "stepTitle": "",
    "description": "",
    "directions": "Rotating counterclockwise would increase the volume while rotating clockwise would decrease the volume.",
    "user_instructions": "",
    "objectsInFocus": []
}
"11":{
    "stepTitle": "",
    "description": "",
    "directions": "Now set the volume of the pipette to match the volume shown. Use the right arrow to move the push button counterclockwise  and the left arrow to rotate the push button clockwise.",
    "user_instructions": "Target volume: 1ul", 
    "objectsInFocus": ["setPipetteVolumeUI"]
}
"12":{
    "stepTitle": "Tip selection",
    "description": "Instruct user on how to select the right tip",
    "directions": "Good Job! Now let us look at identifying the correct tip holder box.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"13":{
    "stepTitle": "",
    "description": "",
    "directions": "In front of us we have some tip holders for each kind of micrpipette. We will need to identify the correct box to use based on the micropipette we selected.",
    "user_instructions": "", 
    "objectsInFocus": ["tipBoxRed", "tipBoxOrange", "tipBoxYellow", "tipBoxBlue", "tipBoxStation"]
}
"14":{
    "stepTitle": "",
    "description": "",
    "directions": "Different micropipettes require different-sized disposable tips. Red = P2, Orange = P20, Yellow = P200, Blue = P1OOO.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"15":{
    "stepTitle": "",
    "description": "",
    "directions": "Please select the appropriate tip.",
    "user_instructions": "Target pipette: P2", 
    "objectsInFocus": []
}
"16":{
    "stepTitle": "Attach tip",
    "description": "Instruct user on how to attach the tip",
    "directions": "Well done! Now let us look at attaching the tip!",
    "user_instructions": "", 
    "objectsInFocus": []
}
"17":{
    "stepTitle": "",
    "description": "",
    "directions": "To attach the pipette tip you must simply push the pipette into the tip holder until the tip is attached.",
    "user_instructions": "", 
    "objectsInFocus": ["micropipetteP2", "tipBoxRed"]
}
"18":{
    "stepTitle": "",
    "description": "",
    "directions": "Attach the tip by using the joystick to press the micropipette firmly down onto the tip.",
    "user_instructions": "Move the joystick down until the pipette hits the tip box to attach the tip to the pipette!", 
    "objectsInFocus": ["tipAttachUI"]
}
"19":{
    "stepTitle": "Extract volume",
    "description": "Instruct user on how to extract volume from a container",
    "directions": "Good job! Now let us look at extracting volume.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"20":{
    "stepTitle": "",
    "description": "",
    "directions": "Now that we have set the volume on the pipette we can now look at extracting the given volume of a reagent.",
    "user_instructions": "", 
    "objectsInFocus": ["micropipetteP2withTip", "beakerWithReagent"]
}
"21":{
    "stepTitle": "",
    "description": "",
    "directions": "Using the joystick, press the plunger to the first stop.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"22":{
    "stepTitle": "",
    "description": "",
    "directions": "Now adjust the push button slider until you reach the first stop.",
    "user_instructions": "Use your finger to move the pipette push button down to the first stop before inserting the pipette into the liquid", 
    "objectsInFocus": ["pipettingStopsUI"]
}
"23":{
    "stepTitle": "",
    "description": "",
    "directions": "While holding the push button use the joystick to insert the tip into the liquid just below the meniscus.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"24":{
    "stepTitle": "",
    "description": "",
    "directions": "Use the joystick to move the pipette deep enough so the tip is submerged into the reagent.",
    "user_instructions": "Dip the pipette into the reagent by using the joystick (moving the joystick down and vice versa). Make sure that the pipette tip is only partially submerged!", 
    "objectsInFocus": ["movePipetteUI"]
}
"25":{
    "stepTitle": "",
    "description": "",
    "directions": "Good job! Now it is time to release the push button slowly to start extracting the liquid.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"26":{
    "stepTitle": "",
    "description": "",
    "directions": "Slowly move the joystick up, allowing the plunger to return to its original position to draw up the liquid.",
    "user_instructions": "", 
    "objectsInFocus": ["pipettingStopsUI"]
}
"27":{
    "stepTitle": "",
    "description": "",
    "directions": "Now use the joystick to pull the pipette up out of the liquid solution.",
    "user_instructions": "Use the joystick to safely take the pipette out of the liquid.", 
    "objectsInFocus": ["movePipetteUI"]
}
"28":{
    "stepTitle": "",
    "description": "",
    "directions": "Good job! Now that we've extracted teh liquid, let us dump the liquid out.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"29":{
    "stepTitle": "",
    "description": "",
    "directions": "Before dumping the liquid, it is always good practice to position the pipette to the side of the beaker.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"30":{
    "stepTitle": "",
    "description": "",
    "directions": "Using the joystick, move the pipette to the side of the new beaker you wish to expel the liquid into.",
    "user_instructions": "Use the joystick to move the pipette to the side of the beaker to prepare dumping the liquid.", 
    "objectsInFocus": ["movePipetteUI"]
}
"31":{
    "stepTitle": "",
    "description": "",
    "directions": "Use the joystick to press the plunger all the way to the second stop and slowly release to expel the liquid.",
    "user_instructions": "", 
    "objectsInFocus": ["secondStopArrow"]
}
"32":{
    "stepTitle": "",
    "description": "",
    "directions": "Use the slider to dump the liquid!",
    "user_instructions": "", 
    "objectsInFocus": ["pipettingStopsUI"]
}
"33":{
    "stepTitle": "Tip disposal",
    "description": "Instruct user on how to dispose of used pipette tips",
    "directions": "Almost there! Now, all we have left to do is dispose of the pipette tip!",
    "user_instructions": "", 
    "objectsInFocus": []
}
"34":{
    "stepTitle": "",
    "description": "",
    "directions": "After using your pipette it is always good practice to eject the tip into an appropriate waste disposal box.",
    "user_instructions": "", 
    "objectsInFocus": ["arrow"]
}
"35":{
    "stepTitle": "",
    "description": "",
    "directions": "To eject the tip you must push down on the tip ejector button shown on the pipette.",
    "user_instructions": "", 
    "objectsInFocus": []
}
"36":{
    "stepTitle": "",
    "description": "",
    "directions": "Use the joystick to push down on the tip ejector and eject the pipette tip!",
    "user_instructions": "", 
    "objectsInFocus": ["movePipetteUI"]
}
"37":{
    "stepTitle": "",
    "description": "",
    "directions": "Great work scientist! You have now learned the basics of using a micropipette!",
    "user_instructions": "You have completed the lab!", 
    "objectsInFocus": ["labCompletionUI"]
}
