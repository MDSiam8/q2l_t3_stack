import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

const AnswerBox = (
  {
    question,
    correctAnswer,
    onCorrectAnswer,
  }: {
    question: string;
    correctAnswer: string;
    onCorrectAnswer: Function;
  },
  props : any
) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [countdown, setCountdown] = useState(3); // Countdown state

  useEffect(() => {
    let timer;
    if (answerFeedback === "Correct!") {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            onCorrectAnswer(); // Call the parent function to handle the AnswerBox visibility
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    // Clean up the interval on unmount
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [answerFeedback, onCorrectAnswer]);

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setAnswerFeedback("Correct!");
    } else {
      setAnswerFeedback("Incorrect, try again.");
    }
  };

  return (
    <group>
      <Html
      occlude={100}
        zIndexRange={[10, 0]}
        center
        transform
        rotation-y={(3.14 / 180) * 90}
        {...props}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div className="relative flex flex-col items-center p-5 bg-black bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg border border-white border-opacity-20 text-white user-select-none">
            <p className="mb-5 font-bold">{question}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="p-2.5 mb-2.5 rounded border border-gray-300 w-full text-black"
            />
            <button
              onClick={checkAnswer}
              className="w-full py-2.5 px-5 border-none rounded bg-gradient-to-r from-cyan-400 to-blue-500 text-white cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              Check Answer
            </button>
            <div
              className={`mt-2.5 font-bold ${answerFeedback === "Correct!" ? "text-green-300" : "text-red-400"}`}
            >
              {answerFeedback}
            </div>
            {answerFeedback === "Correct!" && (
              <div className="absolute bottom-2.5 right-2.5 text-white text-sm font-light">
                Closing in {countdown}...
              </div>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default AnswerBox;
