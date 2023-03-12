// in this file, we assemble the view of two audio files for the user to playback. Each time this component loads, it provides two, new and unique, randomly selected sounds.
// 1. We get two Spectogram components.
import { Spectrogram } from "../Spectrogram/Spectrogram";

type SpectrogramViewProps = {
  updateSound: boolean;
}

export function SpectrogramView({ updateSound }: SpectrogramViewProps) {
  return <Spectrogram updateSound={updateSound}></Spectrogram>;
}
