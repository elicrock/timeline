interface Event {
  id: number;
  year: number;
  description: string;
}

export interface Data {
  id: number;
  category: string;
  events: Event[];
}

export interface DataSchema {
  sliders: { [key: string]: Data[] };
  currentYearIndex: number;
  isCompleteAnimationCircle: boolean;

  setDataStore: (id: string, data: Data[]) => void;
  setCurrentYearIndex: (years: number) => void;
  setIsCompleteAnimationCircle: (isComplete: boolean) => void;
}
