import React, { useState, lazy, Suspense } from "react";
// Lazy load all experience components
const AnalyticalBalanceExperience = lazy(
  () => import("~/AnalyticalBalanceLab/components/Experience"),
);
const RotaryEvaporationExperience = lazy(
  () => import("~/RotaryEvaporation/components/Experience"),
);
const MicropipetteExperience = lazy(
  () => import("~/UpdatedMicropipetteLab/Experience"),
);
const StandardStockSolutionExperience = lazy(
  () => import("~/StandardStockSolutionLab/Experience"),
);
const DilutingStandardSolutionExperience = lazy(
  () => import("~/DilutingStandardSolutionLab/Experience"),
);
const SeparatingLiquidsExperience = lazy(
  () => import("~/SeperatingLiquidsLab/components/Experience"),
);

// Define types for lab selection
export type LabType =
  | "analytical_balance"
  | "rotary_evaporation"
  | "micropipette"
  | "standard_stock_solution"
  | "diluting_standard_solution"
  | "separating_liquids";

interface ChatCanvasProps {
  width?: string;
  height?: string;
  step?: number;
  labType?: LabType;
}

const cameraConfig = {
  position: [25, 6, -1] as [number, number, number],
  zoom: 0.5,
  viewLocation: [0, -10, 0] as [number, number, number],
};

const ChatCanvas: React.FC<ChatCanvasProps> = ({
  width = "100%",
  height = "150px",
  step = 1,
  labType = "analytical_balance", // Default lab type
}) => {
  const [locked, setLocked] = useState(true);

  const handleUnlock = () => {
    setLocked(false);
  };

  const renderExperience = () => {
    const commonProps = {
      currentStep: step,
      onStepChange: () => {}, // No-op since we don't allow step changes in preview
      cameraConfig: cameraConfig,
      canInteract: false, // Disable all interaction with the lab
      onLabComplete: () => {},
    };

    switch (labType) {
      case "analytical_balance":
        return <AnalyticalBalanceExperience {...commonProps} />;
      case "rotary_evaporation":
        return <RotaryEvaporationExperience {...commonProps} />;
      case "micropipette":
        return <MicropipetteExperience {...commonProps} />;
      case "standard_stock_solution":
        return <StandardStockSolutionExperience {...commonProps} />;
      case "diluting_standard_solution":
        return <DilutingStandardSolutionExperience {...commonProps} />;
      case "separating_liquids":
        return <SeparatingLiquidsExperience {...commonProps} />;
      default:
        return <AnalyticalBalanceExperience {...commonProps} />;
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          filter: locked ? "blur(5px)" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center bg-gray-100">
              Loading lab...
            </div>
          }
        >
          {renderExperience()}
        </Suspense>
      </div>
      {/* Blur overlay with button */}
      {locked && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <button
            onClick={handleUnlock}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg transition hover:bg-blue-700"
          >
            View Lab
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatCanvas;
