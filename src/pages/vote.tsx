// This component will maintain state that updates when either vote button is pressed. When either button is pressed, the tally for that sound will increment and the spectogram view will refresh.

import { VoteButton } from "@/components/VoteButton";
import { SpectrogramView } from "@/components/SpectrogramView";
import { useState } from "react";

export default function Vote() {
  const [score, setScore] = useState(0);
  const increaseScore = () => setScore(score + 1);

  return (
    <div>
      <p>Your score is {score}</p>
      <button onClick={increaseScore}>+</button>
    </div>
  );
}
