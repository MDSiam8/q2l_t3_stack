import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import graph01 from '../images/graph_01.png'; 
interface AnswerChoice {
  id: string;
  text: string;
}
interface MultipleChoiceProps {
  question: string;
  choices: AnswerChoice[];
  correctAnswer: string;
  onCorrectAnswer: Function;
  imageUrl?: string;
}
const AnswerBox = ({ question, choices, correctAnswer, onCorrectAnswer, imageUrl }: MultipleChoiceProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  useEffect(() => {
    if (!isVisible) {
      const timeoutId = setTimeout(() => setShouldRender(false), 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible]);
  const checkAnswer = () => {
    if (!selectedAnswer) {
      setAnswerFeedback("Please select an answer.");
      return;
    }
    if (selectedAnswer === correctAnswer) {
      setAnswerFeedback("Correct!");
      onCorrectAnswer();
      setIsVisible(false);
    } else {
      setAnswerFeedback("Incorrect, try again.");
    }
  };
  if (!shouldRender) return null;
  return (
    <group>
      <Html
        occlude="raycast"  // Changed from 100 to "raycast"
        zIndexRange={[10, 0]}
        center
        transform
        rotation-y={(3.14 / 180) * 90}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1.5s ease'
        }}
      >
        <div className="flex justify-center items-center max-w-xs h-full">
          <div className="relative flex flex-col items-center p-5 bg-black bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg border border-white border-opacity-20 text-white user-select-none">
            <p className="mb-5 font-bold">{question}</p>
            {imageUrl && (
              <img src={imageUrl} alt="Answer Illustration" className="mb-5 max-w-xs" />
            )}
            <div className="w-full space-y-2 mb-4">
              {choices.map((choice) => (
                <label
                  key={choice.id}
                  className={`flex items-center p-2 rounded cursor-pointer transition-colors
                    ${selectedAnswer === choice.id
                      ? 'bg-blue-500 bg-opacity-50'
                      : 'hover:bg-white hover:bg-opacity-10'
                    }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={choice.id}
                    checked={selectedAnswer === choice.id}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="mr-2"
                  />
                  <span>{choice.text}</span>
                </label>
              ))}
            </div>
            <button
              onClick={checkAnswer}
              className="w-full py-2.5 px-5 border-none rounded bg-gradient-to-r from-cyan-400 to-blue-500 text-white cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              Check Answer
            </button>
            <div
              className={`mt-2.5 font-bold ${
                answerFeedback === "Correct!"
                  ? "text-green-300"
                  : answerFeedback === "Please select an answer."
                    ? "text-yellow-300"
                    : "text-red-400"
              }`}
            >
              {answerFeedback}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
export default AnswerBox;