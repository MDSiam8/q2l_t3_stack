import { ActionName } from "./types"

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
  // liquid and beaker are individual layers
}

export interface HorizontalGelTankRef extends BaseModelRef {
  // each tank component is an individual layer
}

export interface MicropipetteRef extends BaseModelRef {
  // each tank component is an individual layer
}

export interface MicropipetteTipBoxRef extends BaseModelRef {
  // each tank component is an individual layer
}