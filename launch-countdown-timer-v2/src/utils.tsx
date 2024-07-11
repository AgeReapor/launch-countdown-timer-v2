import { DerivedTime } from "./types";

export function calculateRemainingTime(targetTimeInMs: number): DerivedTime {
  const timeNow = Date.now();

  const timeRemaining = Math.abs(targetTimeInMs - timeNow);

  const daysInMs = 24 * 60 * 60 * 1000;
  const hoursInMs = 60 * 60 * 1000;
  const minutesInMs = 60 * 1000;
  const secondsInMs = 1000;

  const days = Math.floor(timeRemaining / daysInMs);
  const hours = Math.floor((timeRemaining % daysInMs) / hoursInMs);
  const minutes = Math.floor((timeRemaining % hoursInMs) / minutesInMs);
  const seconds = Math.floor((timeRemaining % minutesInMs) / secondsInMs);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
