import React, { forwardRef, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Group } from 'three';
import { GlassDropper } from '../models/GlassDropper';
import { FillToLine } from '../models/FillToLine';
import Droplet from '../models/Droplet';

interface SelectedItems {
  [itemName: string]: boolean;
}

interface TenStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}

interface DropletData {
  id: number;
  position: [number, number, number];
}

const Step10UseDropperToAdjustVolume = forwardRef<HTMLDivElement, TenStepProps>(
  ({ nextButtonRef, selectedItems }, ref) => {
    const dropperRef = useRef<Group>(null);
    const fillToLineRef = useRef<any>(null);

    const [droplets, setDroplets] = useState<DropletData[]>([]);

    // Function to add a droplet
    const addDroplet = () => {
      if (dropperRef.current) {
        const dropperPosition = dropperRef.current.position;
        const startPosition: [number, number, number] = [
          dropperPosition.x,
          dropperPosition.y - 0.5,
          dropperPosition.z,
        ];
        setDroplets((prevDroplets) => [
          ...prevDroplets,
          {
            id: Math.random(),
            position: startPosition,
          },
        ]);
      }
    };

    // Function to handle droplet reaching the target
    const handleDropletReachTarget = (id: number) => {
      setDroplets((prevDroplets) =>
        prevDroplets.filter((droplet) => droplet.id !== id)
      );
      fillToLineRef.current?.play();
    };

    // Click handler for animation
    const handleClick = () => {
      if (dropperRef.current && fillToLineRef.current) {
        const tl = gsap.timeline();

        // Animate dropper hovering above the beaker
        tl.to(dropperRef.current.position, {
          x: 0,
          y: 8.5,
          z: 2,
          duration: 1.5,
        })
          .to(
            dropperRef.current.rotation,
            {
              x: -Math.PI / 4,
              y: 0,
              z: 0,
              duration: 1,
            },
            "<"
          )
          .add(() => {
            releaseDroplets();
          });
      } else {
        console.warn('dropperRef or fillToLineRef is null');
      }
    };

    // Function to release droplets at intervals
    const releaseDroplets = () => {
      const dropletInterval = setInterval(() => {
        addDroplet();
      }, 500); // Release a droplet every 0.5 seconds

      // Stop releasing droplets after some time
      setTimeout(() => {
        clearInterval(dropletInterval);
      }, 3000); // Adjust duration as needed
    };

    return (
      <group>
        {/* GlassDropper with animation */}
        <group
          ref={dropperRef}
          position={[0, 5, 0]}
          rotation={[0, 0, 0]}
          onClick={handleClick}
        >
          <GlassDropper />
        </group>

        {/* FillToLine element */}
        <FillToLine ref={fillToLineRef} position={[0, 5, 2]} />

        {/* Render droplets */}
        {droplets.map((droplet) => (
          <Droplet
            key={droplet.id}
            position={droplet.position}
            onReachTarget={() => handleDropletReachTarget(droplet.id)}
          />
        ))}
      </group>
    );
  }
);

export default Step10UseDropperToAdjustVolume;
