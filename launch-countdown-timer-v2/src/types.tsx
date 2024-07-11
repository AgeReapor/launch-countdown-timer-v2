export type FlipcardData = {
  value: number;
  title: string;
};

export type FlipcardState = {
  value: string;
  nextValue: string;
};

export type ClockState = {
  targetTimeInMs: number;
  isRunning: boolean;
};

export type DerivedTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
