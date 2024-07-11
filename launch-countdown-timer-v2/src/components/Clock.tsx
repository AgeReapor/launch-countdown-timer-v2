import "./Clock.scss";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ClockState, DerivedTime } from "../types";
import { calculateRemainingTime } from "../utils";
import { useEffect, useState } from "react";
import Flipcard from "./Flipcard";

export default function Clock() {
  const storageKey: string = "front-end-countdown-timer-key";
  const twoWeeksFromNow = 14 * 24 * 60 * 60 * 1000;
  const initialTargetTime = Date.now() + twoWeeksFromNow;

  const initialState: ClockState = {
    targetTimeInMs: initialTargetTime,
    isRunning: true,
  };

  // State for the countdown target, persists in browser
  const [clockState, setClockState] = useLocalStorage<ClockState>(
    storageKey,
    initialState
  );

  // State for the countdown timer
  const [timeData, setTimeData] = useState<DerivedTime>(
    calculateRemainingTime(clockState.targetTimeInMs)
  );

  // On mount, update the timeData every second
  useEffect(() => {
    // Only update if the clock is running
    if (!clockState.isRunning) return;

    const interval = setInterval(() => {
      const newTimeData = calculateRemainingTime(clockState.targetTimeInMs);
      setTimeData(newTimeData);

      // If the time has run out, stop the clock
      if (
        timeData.seconds === 0 &&
        timeData.minutes === 0 &&
        timeData.hours === 0 &&
        timeData.days === 0
      ) {
        setClockState({ ...clockState, isRunning: false });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clockState.isRunning]);

  return (
    <main>
      <div className="flipcards">
        <Flipcard value={timeData.days} title="Days" />
        <Flipcard value={timeData.hours} title="Hours" />
        <Flipcard value={timeData.minutes} title="Minutes" />
        <Flipcard value={timeData.seconds} title="Seconds" />
      </div>
    </main>
  );
}
