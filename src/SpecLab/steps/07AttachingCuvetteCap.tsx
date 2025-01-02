import React, { useRef, forwardRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Group } from "three";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Cuvette } from "../models/Cuvette";
import { CuvetteCap } from "../models/CuvetteCap";

interface Step7Props {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step7AttachingCuvetteCap = forwardRef<HTMLDivElement, Step7Props>(
    ({ nextButtonRef }, ref) => {
        const capRef = useRef<Group>(null);

        useEffect(() => {
            if (capRef.current) {
                setNextDisabled(nextButtonRef);

                const timeline = gsap.timeline();
                timeline
                    .to(capRef.current.position, {
                        y: "+=2",
                        z: "-=1.5",
                        duration: 1
                    })
                    .to(capRef.current.position, {
                        y: "-=1.25",
                        duration: 1,
                        onComplete: () => {
                            setNextEnabled(nextButtonRef);
                        }
                    });
            }
        }, []);

        return (
            <group>
                <Cuvette position={[0, 5, 0]} />
                <group ref={capRef}>
                    <CuvetteCap position={[-.24, 4.85, 1.5]} />
                </group>
            </group>
        );
    }
);

export default Step7AttachingCuvetteCap;


