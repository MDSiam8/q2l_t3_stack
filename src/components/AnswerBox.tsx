import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

const AnswerBox = ({
  question,
  correctAnswer,
  onCorrectAnswer,
}: {
  question: string;
  correctAnswer: string;
  onCorrectAnswer: Function;
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [countdown, setCountdown] = useState(3); // Countdown state

  useEffect(() => {
    let timer: NodeJS.Timeout;
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
    <Html zIndexRange={[100, 0]} center>
      <div
        className="answer-box-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="answer-box"
          style={{
            position: "relative", // Added to position the countdown absolutely
            display: "flex",
            width: "300px",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            userSelect: "none",
            color: "#fff",
          }}
        >
          <p style={{ margin: "0 0 20px 0", fontWeight: "bold" }}>{question}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "100%",
              color: "#000",
            }}
          />
          <button
            onClick={checkAnswer}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              background: "linear-gradient(to right, #6dd5ed, #2193b0)",
              color: "white",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Check Answer
          </button>
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color: answerFeedback === "Correct!" ? "greenyellow" : "#FF3385",
            }}
          >
            {answerFeedback}
          </div>
          {answerFeedback === "Correct!" && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                color: "white",
                fontWeight: "lighter",
                fontSize: "0.8rem",
              }}
            >
              Closing in {countdown}...
            </div>
          )}
        </div>
      </div>
    </Html>
  );
};

export default AnswerBox;
