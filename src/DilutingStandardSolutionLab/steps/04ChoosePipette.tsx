import React, { useState, forwardRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import { GlassPipette } from "../models/GlassPipette";
import { setNextDisabled, setNextEnabled } from "../../RotaryEvaporation/components/Experience";
import * as THREE from "three";

interface Step4Props {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step4ChoosePipette = forwardRef<THREE.Group, Step4Props>(
    (props, ref) => {
        const { nextButtonRef } = props;

        useEffect(() => {
            setNextDisabled(nextButtonRef);
        }, []);

        const [dialog, setDialog] = useState({
            show: false,
            message: "",
            position: new THREE.Vector3(),
        });

        const handlePipetteClick = (
            size: number,
            position: [number, number, number],
        ) => {
            let message = "";
            if (size === 10) {
                setNextEnabled(nextButtonRef);
                message = "Correct! The 10 mL pipette is the right choice for this measurement.";
            } else if (size === 5) {
                message = "Incorrect. The 5 mL pipette would take too many transfers and increase measurement error.";
            } else {
                message = "Incorrect. The 1 mL pipette would take too many transfers and increase measurement error.";
            }

            setDialog({
                show: true,
                message,
                position: new THREE.Vector3(...position),
            });
        };

        return (
            <group ref={ref}>
                {/* 1mL Pipette */}
                <group position={[2.2, 5, -2.2]} scale={0.3}>
                    <GlassPipette />
                    <group rotation-y={Math.PI / 2}>
                        <Html position={[0, 1.67, 0]} transform scale={1}>
                            <div
                                className="bg-white rounded px-2 py-1 text-center select-none cursor-pointer hover:bg-gray-100"
                                onClick={() => handlePipetteClick(1, [2.2, 6, -2.2])}
                            >
                                1 mL
                            </div>
                        </Html>
                    </group>
                </group>

                {/* 5mL Pipette */}
                <group position={[2.2, 5, 0]} scale={0.4}>
                    <GlassPipette />
                    <group rotation-y={Math.PI / 2}>
                        <Html position={[0, 1.25, 0]} transform scale={1}>
                            <div
                                className="bg-white rounded px-2 py-1 text-center select-none cursor-pointer hover:bg-gray-100"
                                onClick={() => handlePipetteClick(5, [2.2, 6, 0])}
                            >
                                5 mL
                            </div>
                        </Html>
                    </group>
                </group>

                {/* 10mL Pipette */}
                <group position={[2.2, 5, 2.2]} scale={0.5}>
                    <GlassPipette />
                    <group rotation-y={Math.PI / 2}>
                        <Html position={[0, 1, 0]} transform scale={1}>
                            <div
                                className="bg-white rounded px-2 py-1 text-center select-none cursor-pointer hover:bg-gray-100"
                                onClick={() => handlePipetteClick(10, [2.2, 6, 2.2])}
                            >
                                10 mL
                            </div>
                        </Html>
                    </group>
                </group>

                {dialog.show && (
                    <Html position={dialog.position} transform scale={0.3} rotation-y={Math.PI / 2}>
                        <div
                            className={`rounded-lg p-6 text-sm shadow-lg ${dialog.message.startsWith("Correct")
                                    ? "border-green-500 bg-green-100 text-green-900"
                                    : "border-red-500 bg-red-100 text-red-900"
                                } max-w-[350px] min-w-[120px] border select-none`}
                        >
                            {dialog.message}
                        </div>
                    </Html>
                )}
            </group>
        );
    },
);

export default Step4ChoosePipette;
