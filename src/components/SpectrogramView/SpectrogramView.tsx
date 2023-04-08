// in this file, we assemble the view of two audio files for the user to playback. Each time this component loads, it provides two, new and unique, randomly selected sounds.
// 1. We get two Spectogram components.
import { Spectrogram } from "../Spectrogram/Spectrogram";
import { useSoundContext } from "@/pages/vote";

export function SpectrogramView() {
  const sounds = useSoundContext();
  return (
    <div>
      <Spectrogram sound={sounds[0]} />
      <Spectrogram sound={sounds[1]} />
    </div>
  );
}
