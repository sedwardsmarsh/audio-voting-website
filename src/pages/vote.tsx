// This component will maintain state that updates when either vote button is pressed. When either button is pressed, the tally for that sound will increment and the spectogram view will refresh.

import { VoteButton } from "@/components/VoteButton";
import { SpectrogramView } from "@/components/SpectrogramView";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

const sound_data = ["a", "b", "c", "d", "e", "f"];

export type Sound = string | undefined;
type Sounds = [Sound, Sound];
const SoundContext = createContext<Sounds>([undefined, undefined]);
export const useSoundContext = () => useContext(SoundContext);

export default function Vote() {
  // chosen sounds
  const [chosenSounds, setChosenSounds] = useState<Sounds>([
    undefined,
    undefined,
  ]);
  // sounds remaining in the database
  const [remainingSounds, setRemainingSounds] = useState<Sound[]>(sound_data);

  // useCallback is called, which memoizes the internal callback fn
  // whenever inputs in the dependency array mutate (remainingSounds, chosenSounds)
  const shuffleSounds = useCallback(
    // obtain the currently available sounds from remainingSounds
    // as opposed to indexing remainingSounds directly. What we're doing here
    // is *like* a read lock on remainingSounds.
    (removePrevSounds: boolean = true) => {
      let currentSounds = remainingSounds.filter(
        (sound) => sound != chosenSounds[0] && sound != chosenSounds[1]
      );
      // randomly choose two sounds from the remaining sounds.
      const sound_1_idx = Math.floor(Math.random() * currentSounds.length);
      let sound_1 = currentSounds[sound_1_idx];
      const sound_2_idx = Math.floor(
        Math.random() * (currentSounds.length - 1)
      );
      let sound_2 = currentSounds.filter((sound) => sound != sound_1)[
        sound_2_idx
      ];
      // setting the two selected chosenSounds into state
      setChosenSounds([sound_1, sound_2]);
      if (!removePrevSounds) return;
      setRemainingSounds(currentSounds);
    },
    // this callback is called whenever either of these state blobs mutate
    [remainingSounds, chosenSounds]
  );

  // called during first render of component
  useEffect(() => {
    shuffleSounds(false);
  }, []);

  return (
    <SoundContext.Provider value={chosenSounds}>
      <div>
        <SpectrogramView />
        <button
          onClick={() => {
            shuffleSounds();
          }}
        >
          new button
        </button>
      </div>
    </SoundContext.Provider>
  );
}
