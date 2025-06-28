import Step1Introduction from "./01IntroduceLabObjectives";
import SecondStepComponent from "./02ApparatusAndChemicalSelection";
import Step3TransferStandardSolution from "./03TransferStandardSolution";
import Step4ChoosePipette from "./04ChoosePipette";
import Step5SelectTheCorrectGlassPipette from "./05SelectTheCorrectGlassPipette";
import Step6AttachPipetteFiller from "./06AttachPipetteFiller";
import Step7FillThePipette from "./07FillThePipette";
import Step8TransferToFlask from "./08TransferSolutionToVolumetricFlask";
// import Step9AddWaterToVolumetricFlask from "./09AddWaterToVolumetricFlask";
import Step10UseDropperToAdjustVolume from "./10UseDropperToAdjustVolume";
import Step11AddStopperAndMixSolution from "./11AddStopperAndMixSolution";
import Step12PrepareAdditionalDilutions from "./12PrepareAdditionalDilutions";
import Step13PrepareBlankSolution from "./13PrepareBlankSolution";

const StepComponents = {
  1: Step1Introduction,
  2: SecondStepComponent,
  3: Step3TransferStandardSolution,
  4: Step4ChoosePipette,
  5: Step5SelectTheCorrectGlassPipette,
  6: Step6AttachPipetteFiller,
  7: Step7FillThePipette,
  8: Step8TransferToFlask,
  // 9: Step9AddWaterToVolumetricFlask,
  10: Step10UseDropperToAdjustVolume,
  11: Step11AddStopperAndMixSolution,
  12: Step12PrepareAdditionalDilutions,
  13: Step13PrepareBlankSolution,
};

export default StepComponents;