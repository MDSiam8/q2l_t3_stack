import { ActionName } from "./types";

export interface BaseModelRef extends THREE.Object3D {
  performAction: (actionName: ActionName) => Promise<void>; // Added a placeholder actionName parameter and return type
  replayAnimation: () => Promise<void>;
  // position: (position: [number, number, number]) => void;
  // position: () => [number, number, number];
}

export interface AnalyticalBalanceModelRef extends BaseModelRef {
  updateBalanceReading: (weight: number) => void;
  // position: (position: [number, number, number]) => void;
  // position: () => [number, number, number];
}

export interface SampleBottleModelRef extends BaseModelRef {
    // No additional functionality needed
}

export interface BeakerRef extends BaseModelRef {
  
}

export interface BeakerGlbRef extends BaseModelRef {
  // Audited and .glb variant of Beaker.gltf
}

export interface HorizontalGelTankRef extends BaseModelRef {
  // Contains tank, power source, gel holder, blockers, and gel comb as separate layers
}