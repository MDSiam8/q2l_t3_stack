import React, { useState, forwardRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Spectrophotometer } from "../models/Spectrophotometer";

interface Step2Props {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step2AdjustSpectrophotometerSettings = forwardRef<THREE.Group, Step2Props>(
    (props, ref) => {
        const { nextButtonRef } = props;

        const [wavelength, setWavelength] = useState("");
        const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

        useEffect(() => {
            setNextDisabled(nextButtonRef);
            if (isCorrect) {
                setNextEnabled(nextButtonRef);
            }
        }, [isCorrect]);

        const handleNumberClick = (num: string) => {
            setWavelength((prev) => prev + num);
        };

        const handleEnter = () => {
            if (wavelength === "280") {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
            }
        };

        const handleBackspace = () => {
            setWavelength((prev) => prev.slice(0, -1));
        };

        return (
            <group ref={ref}>
                <Spectrophotometer position={[0, 5, 0]} />

                <group rotation={[0, Math.PI / 2, 0]} scale={[0.5, 0.5, 0.5]} position={[0, 7, 3]}>

                    {/* Input Field */}
                    <Html position={[0, 3.5, 0]} transform scale={1}>
                        <div className="input-field">
                            <input
                                type="text"
                                value={wavelength}
                                readOnly
                                placeholder="Choose a wavelength"
                            />
                            <span>nm</span>
                        </div>
                    </Html>

                    {/* Number Pad */}
                    <group position={[0, 0, 0]}>

                        {/* Keypad */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <Html key={num} position={[num % 3 - 1, Math.floor((num - 1) / 3), 0]} transform scale={1}>
                                <div
                                    className="bg-white rounded px-2 py-1 text-center cursor-pointer"
                                    onClick={() => handleNumberClick(num.toString())}
                                >
                                    {num}
                                </div>
                            </Html>
                        ))}
                        <Html position={[0, -1, 0]} transform scale={1}>
                            <div
                                className="bg-white rounded px-2 py-1 text-center cursor-pointer"
                                onClick={() => handleNumberClick("0")}
                            >
                                0
                            </div>
                        </Html>

                        {/* Enter */}
                        <Html position={[-1.2, -2, 0]} transform scale={1}>
                            <div
                                className="bg-blue-500 rounded px-2 py-1 text-center cursor-pointer"
                                onClick={handleEnter}
                            >
                                Enter
                            </div>
                        </Html>

                        {/* Backspace */}
                        <Html position={[1.5, -2, 0]} transform scale={1}>
                            <div
                                className="bg-red-500 rounded px-2 py-1 text-center cursor-pointer"
                                onClick={handleBackspace}
                            >
                                Backspace
                            </div>
                        </Html>
                    </group>

                    {/* Feedback Message */}
                    {isCorrect !== null && (
                        <Html position={[0, 5, 0]} transform scale={0.3}>
                            <div className={`message ${isCorrect ? "correct" : "incorrect"}`}>
                                {isCorrect ? "Correct wavelength!" : "Incorrect wavelength, try again."}
                            </div>
                        </Html>
                    )}
                </group>
            </group>

        );
    },
);

export default Step2AdjustSpectrophotometerSettings;
