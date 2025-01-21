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
      question: "Given an absorbance of 0.07, what is the concentration (ppm) according to the graph?",
      choices: [
        { id: "a", text: "0.153 ppm" },
        { id: "b", text: "0.1 ppm" },
        { id: "c", text: "0.2 ppm" }
      ],
      correctAnswers: "b",
    },
    {
      question: "Given an absorbance of 0.153, what is the concentration (ppm) according to the graph?",
      choices: [
        { id: "a", text: "0.1 ppm" },
        { id: "b", text: "0.6 ppm" },
        { id: "c", text: "0.2 ppm" }
      ],
      correctAnswers: "c",
    },
    {
      question: "Given an absorbance of 0.315, what is the concentration (ppm) according to the graph?",
      choices: [
        { id: "a", text: "0.315 ppm" },
        { id: "b", text: "0.4 ppm" },
        { id: "c", text: "0.07 ppm" }
      ],
      correctAnswers: "b",
    },
    {
      question: "Given an absorbance of 0.472, what is the concentration (ppm) according to the graph?",
      choices: [
        { id: "a", text: "0.6 ppm" },
        { id: "b", text: "0.4 ppm" },
        { id: "c", text: "0.8 ppm" }
      ],
      correctAnswers: "a",
    },
    {
      question: "Given an absorbance of 0.63, what is the concentration (ppm) according to the graph?",
      choices: [
        { id: "a", text: "0.8 ppm" },
        { id: "b", text: "0.6 ppm" },
        { id: "c", text: "0.4 ppm" }
      ],
      correctAnswers: "a",
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
  //  updateBalanceReadingAfterAddingPowder(0.5017);
  //  if (nextButtonRef && nextButtonRef.current) {
  //    nextButtonRef.current.disabled = true; // Disable the button initially
  //    nextButtonRef.current.style.opacity = "0.5";
  //  }
  // }, []);
  // const updateBalanceReadingAfterAddingPowder = (num: number) => {
  //  if (balanceWithAnimationsRef.current) {
  //    balanceWithAnimationsRef.current.updateBalanceReading(num);
  //  }
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