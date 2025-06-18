import Step1Introduction from "./Step1Introduction";
import Step2SelectApparatus from "./SecondStepComponent";
import Step3TransferStandardSolution from "./ThirdStepComponent";
import Step4ChoosePipette from "./FourthStepComponent";
import Step5SelectTheCorrectGlassPipette from "./FifthStepComponent";
import Step6AttachPipetteFiller from "./SixthStepComponent";
import Step7FillThePipette from "./SeventhStepComponent";
import Step8TransferToFlask from "./EightStepComponent";
import Step9AddWaterToVolumetricFlask from "./NinthStepComponent";
import Step10UseDropperToAdjustVolume from "./TenthStepComponent";
import Step11AddStopperAndMixSolution from "./EleventhStepComponent";
import Step12PrepareAdditionalDilutions from "./TwelvthStepComponent";
import FinishedStepComponent from "./FinishedStepComponent";

const StepComponents = {
  1: Step1Introduction,
  2: Step2SelectApparatus,
  3: Step3TransferStandardSolution,
  4: Step4ChoosePipette,
  5: Step5SelectTheCorrectGlassPipette,
  6: Step6AttachPipetteFiller,
  7: Step7FillThePipette,
  8: Step8TransferToFlask,
  9: Step9AddWaterToVolumetricFlask,
  10: Step10UseDropperToAdjustVolume,
  11: Step11AddStopperAndMixSolution,
  12: Step12PrepareAdditionalDilutions,
  13: FinishedStepComponent,
};

export default StepComponents;