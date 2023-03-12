// This component will maintain state that updates when either vote button is pressed. When either button is pressed, the tally for that sound will increment and the spectogram view will refresh.

import { VoteButton } from "@/components/VoteButton";
import { SpectrogramView } from "@/components/SpectrogramView";
import { useState } from "react";

export default function Vote() {
  const [updateSound, setUpdateSound] = useState(false);
  const handleToggle = () => {
    setUpdateSound((updateSound) => !updateSound);
  };

  return (
    <div>
      <SpectrogramView updateSound={updateSound}></SpectrogramView>
      <button onClick={handleToggle}>new button</button>
    </div>
  );
}
