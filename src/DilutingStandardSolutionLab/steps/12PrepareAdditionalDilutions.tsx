import React, { forwardRef, useRef, useState, useEffect } from "react";
import { Flask } from "../models/Flask";
import { Stopper } from "../models/Stopper";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { setNextEnabled } from "../Experience";
import AnswerBox from "../ui_overlay/AnswerBox";

interface StopperRef {
  replayAnimation: () => void;
}

interface Step12ComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step12PrepareAdditionalDilutions = forwardRef<{}, Step12ComponentProps>(
  ({ nextButtonRef }, ref) => {
  
  const flaskStopperGroup = useRef(new THREE.Group());
  const stopperGroup = useRef(new THREE.Group());
  const stopperRef = useRef<StopperRef>(null);

  const questions = [
    {
      question: "How many mL of 0.1M stock solution is needed for a standard solution of 0.02M in a 10mL flask? ",
      choices: [
        { id: "a", text: "Add solute first, then fill with solvent" },
        { id: "b", text: "Fill completely with solvent, then add solute" },
        { id: "c", text: "Add solute, partially fill with solvent, mix, then fill to mark" }
      ],
      correctAnswers: "c",
    },
    {
      question: "How many mL of 0.1M stock solution is needed for a standard solution of 0.04M in a 10mL flask? ",
      choices: [
        { id: "a", text: "Add solute first, then fill with solvent" },
        { id: "b", text: "Fill completely with solvent, then add solute" },
        { id: "c", text: "Add solute, partially fill with solvent, mix, then fill to mark" }
      ],
      correctAnswers: "c",
    },
    {
      question: "How many mL of 0.1M stock solution is needed for a standard solution of 0.06M in a 10mL flask? ",
      choices: [
        { id: "a", text: "Add solute first, then fill with solvent" },
        { id: "b", text: "Fill completely with solvent, then add solute" },
        { id: "c", text: "Add solute, partially fill with solvent, mix, then fill to mark" }
      ],
      correctAnswers: "c",
    },
    {
      question: "How many mL of 0.1M stock solution is needed for a standard solution of 0.86M in a 10mL flask? ",
      choices: [
        { id: "a", text: "Add solute first, then fill with solvent" },
        { id: "b", text: "Fill completely with solvent, then add solute" },
        { id: "c", text: "Add solute, partially fill with solvent, mix, then fill to mark" }
      ],
      correctAnswers: "c",
    },

  ]

  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const onCorrectAnswer = () => {
    setIsCorrect(true); // Mark the answer as correct
    setIsAnimationPlaying(true); // Start animation

    // Simulate animation duration
    setTimeout(() => {
      if (currentQuestion === questions.length - 1 && nextButtonRef && nextButtonRef.current) {
        nextButtonRef.current.style.opacity = "1";
        nextButtonRef.current.disabled = false; // Enable the button after the animation for the last question
      }
      setIsAnimationPlaying(false); // End animation
      setIsCorrect(false); // Reset correctness
      setCurrentQuestion((prev) => prev + 1); // Load next question
    }, 5000); // Adjust duration to match the actual animation time
  };
  

  // useEffect(() => {
  //   updateBalanceReadingAfterAddingPowder(0.5017);
  //   if (nextButtonRef && nextButtonRef.current) {
  //     nextButtonRef.current.disabled = true; // Disable the button initially
  //     nextButtonRef.current.style.opacity = "0.5";
  //   }
  // }, []);

  // const updateBalanceReadingAfterAddingPowder = (num: number) => {
  //   if (balanceWithAnimationsRef.current) {
  //     balanceWithAnimationsRef.current.updateBalanceReading(num);
  //   }
  // };

  return (
    <group>
      <group 
        ref={flaskStopperGroup} 
        position={[0.15, 5, 0]}
      >
        <Flask
          rotation={[0, 0, 0]}
          scale={0.5}
        />
        <Stopper
          capped={false}
          rotation-x={(3.14 / 180) * 180}
          scale={0.5}
          position={[0, 1.95, 0]}
        />
      </group>
      {!isAnimationPlaying && currentQuestion < questions.length && (
        <group position={[0, 7, 3]} scale={0.5}>
          {questions[currentQuestion] && (
            <AnswerBox
              question={questions[currentQuestion].question}
              choices={questions[currentQuestion].choices}
              correctAnswer={questions[currentQuestion].correctAnswers}
              onCorrectAnswer={onCorrectAnswer}
            />
          )}
        </group>
      )}
    </group>
  );
});

export default Step12PrepareAdditionalDilutions; 