import "./Flipcard.scss";
import { useEffect, useState } from "react";
import type { FlipcardData, FlipcardState } from "../types";

export default function Flipcard(props: FlipcardData) {
  function numToString(num: number, digits: number = 2) {
    return "0".repeat(digits - num.toString().length) + props.value.toString();
  }

  // set initial values
  let titleString = props.title.toUpperCase();

  // initialize Flipcard State
  const [flipcardState, setFlipcardState] = useState<FlipcardState>({
    value: "00",
    nextValue: numToString(props.value),
  });

  // Get flipper element to animate
  const flipperId = "flipper-" + titleString;
  const flipper = document.getElementById(flipperId);

  // Update title when it changes
  useEffect(() => {
    titleString = props.title.toUpperCase();
  }, [props.title]);

  // Update value when prop value changes
  useEffect(() => {
    // update flipcard values, then add the animation class on the flipper

    const newFlipcardState: FlipcardState = {
      value: flipcardState.nextValue,
      nextValue: numToString(props.value),
    };
    setFlipcardState(newFlipcardState);

    // alternates between the same animations under different names to force restart the animation
    const animationId = props.value % 2 === 0 ? "flip1" : "flip2";
    flipper?.classList.remove("flip1", "flip2");
    flipper?.classList.add(animationId);
  }, [props.value]);

  // animate flipcard on value change
  useEffect(() => {}, [flipcardState]);

  return (
    <div className="flipcard">
      <div className="flipper" id={flipperId}>
        <div className="card old top">
          <div className="number">
            <h2>{flipcardState.value}</h2>
          </div>
        </div>
        <div className="card new bot">
          <div className="number">
            <h2>{flipcardState.nextValue}</h2>
          </div>
        </div>
      </div>

      <div className="card old bot">
        <div className="number">
          <h2>{flipcardState.value}</h2>
        </div>
      </div>

      <div className="card new top">
        <div className="number">
          <h2>{flipcardState.nextValue}</h2>
        </div>
      </div>

      <div className="titleContainer">
        <h4>{titleString}</h4>
      </div>
    </div>
  );
}
