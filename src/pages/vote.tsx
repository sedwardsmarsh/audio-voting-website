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

const sound_data = ["laugh", "fart", "burp", "clap", "whistle", "bang"];

export type Sound = string | undefined;
type Sounds = [Sound, Sound];
const SoundContext = createContext<Sounds>([undefined, undefined]);
export const useSoundContext = () => useContext(SoundContext);

export default function Vote() {
  // currently available SOUNDS
  const [sounds, setSounds] = useState<Sounds>([undefined, undefined]);
  // sounds remaining in the database
  const [availableSounds, setAvailableSounds] = useState<Sound[]>(sound_data);

  // useCallback is called, which memoizes the internal callback fn
  // whenever inputs in the dependency array mutate (availableSounds, sounds)
  const shuffleSounds = useCallback(
    (removePrevSounds: boolean = true) => {
      let curSounds = availableSounds.filter(
        (sound) => sound != sounds[0] && sound != sounds[1]
      );
      const rand_idx_1 = Math.floor(Math.random() * curSounds.length);
      let sound_1 = curSounds[rand_idx_1];
      const rand_idx_2 = Math.floor(Math.random() * (curSounds.length - 1));
      let sound_2 = curSounds.filter((sound) => sound != sound_1)[rand_idx_2];
      setSounds([sound_1, sound_2]);
      if (!removePrevSounds) return;
      setAvailableSounds(curSounds);
    },
    [availableSounds, sounds]
  );

  // called during first render of component
  useEffect(() => {
    shuffleSounds(false);
  }, []);

  return (
    <SoundContext.Provider value={sounds}>
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
