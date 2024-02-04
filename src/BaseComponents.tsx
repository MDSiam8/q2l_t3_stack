import { GroupProps, ThreeEvent } from "@react-three/fiber";

// Use the following interface to generate lab components for a lab that is based on ______.
export interface Props extends GroupProps {
  startAnimationDelay?: number;
  animationHasAlreadyPlayed?: boolean;
  onClick?: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
  // Add more props here 
}
