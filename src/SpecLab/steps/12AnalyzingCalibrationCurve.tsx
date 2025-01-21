import React, { forwardRef, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import graph01 from '../images/graph_01.png'; 
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
      question: "Why is it important to pour the standard solution into a clean beaker before pipetting?",
      choices: [
        { id: "a", text: "To prevent contamination from the stock bottle" },
        { id: "b", text: "To measure the volume more accurately" },
        { id: "c", text: "It's not necessary; you can pipette directly from the volumetric flask" }
      ],
      correctAnswers: "a",
    },
    {
      question: "Which pipette is most suitable for transferring 7 mL of solution?",
      choices: [
        { id: "a", text: "Micropipette" },
        { id: "b", text: "5 mL glass pipette" },
        { id: "c", text: "10 mL glass pipette" }
      ],
      correctAnswers: "c",
    },
    {
      question: "At which point should the bottom of the meniscus align when measuring liquid in a pipette?",
      choices: [
        { id: "a", text: "Above the calibration mark" },
        { id: "b", text: "At the calibration mark" },
        { id: "c", text: "beliw the calibration mark" }
      ],
      correctAnswers: "b",
    },
    {
      question: "Why should you allow the pipette to drain completely without blowing out the remaining liquid?",
      choices: [
        { id: "a", text: "To ensure all liquid is transferred" },
        { id: "b", text: "Blowing out can introduce air bubbles, affecting volume accuracy" },
        { id: "c", text: "It's faster to let it drain naturally" }
      ],
      correctAnswers: "b",
    },
    {
      question: "What's the best method to ensure the volumetric flask is filled exactly to the calibration mark?",
      choices: [
        { id: "a", text: "Fill to just below the mark, then use a dropper to add water dropwise" },
        { id: "b", text: "Pour distilled water quickly until it reaches the mark" },
        { id: "c", text: "Overfill the flask and remove excess water" }
      ],
      correctAnswers: "a",
    },
    {
      question: "What's the proper way to mix the solution in a volumetric flask?",
      choices: [
        { id: "a", text: "Shake it vigorously up and down" },
        { id: "b", text: "Stir the solution with a glass rod" },
        { id: "c", text: "Gently invert the flask several times" }
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
      </group>
      {!isAnimationPlaying && currentQuestion < questions.length && (
        <group position={[0, 7, 3]} scale={0.5}>
          {questions[currentQuestion] && (
            <AnswerBox
              question={questions[currentQuestion].question}
              choices={questions[currentQuestion].choices}
              correctAnswer={questions[currentQuestion].correctAnswers}
              onCorrectAnswer={onCorrectAnswer}
              imageUrl={graph01.src} // Add this line to pass the image
            />
          )}
        </group>
      )}
    </group>
  );
});
export default Step12PrepareAdditionalDilutions;