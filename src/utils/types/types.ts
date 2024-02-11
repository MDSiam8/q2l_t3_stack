// types.ts
export interface Position {
    x: number;
    y: number;
  }
  
  export interface PositionRange {
    startingPosition: Position;
    endingPosition: Position;
  }
  
  export interface Hitbox {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export interface ActionWithHitbox {
    action: () => void;
    hitbox: Hitbox;
  }
  
  export interface ObjectInFocus {
    name: string;
    model: any; // Adjust based on your 3D model's type
    actions: Record<string, ActionWithHitbox>;
    position: PositionRange;
  }
  
  export interface TextInput {
    type: "textinput";
    placeholder: string;
    answerKey: string;
  }
  
  export interface Image {
    type: "image";
    src: string;
    caption?: string;
  }
  
  export interface QuizQuestion {
    type: "quiz";
    question: string;
    options: string[];
    correctAnswer: string;
  }
  
  export type InteractiveElement = ObjectInFocus | TextInput | Image | QuizQuestion;
  
  export interface LabStep {
    stepTitle: string;
    description: string;
    directions: string;
    user_instructions?: string;
    interactiveElements: InteractiveElement[];
  }
  
  export type State = LabStep[];
  