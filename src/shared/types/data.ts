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
  currentYearIndexes: Record<string, number>;
  isCompleteAnimationCircles: Record<string, boolean>;

  setDataStore: (id: string, data: Data[]) => void;
  setCurrentYearIndex: (id: string, index: number) => void;
  setIsCompleteAnimationCircle: (id: string, value: boolean) => void;
}
