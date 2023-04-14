// in this file, we assemble the view of two audio files for the user to playback. Each time this component loads, it provides two, new and unique, randomly selected sounds.
// 1. We get two Spectogram components.
import { Spectrogram } from "../Spectrogram/Spectrogram";
import { useSoundContext } from "@/pages/vote";

export function SpectrogramView() {
  const soundIDPair = useSoundContext();
  if (soundIDPair == undefined) return null
  return (
    <div>
      <Spectrogram sound_id={soundIDPair[0]} />
      <Spectrogram sound_id={soundIDPair[1]} />
    </div>
  );
}
