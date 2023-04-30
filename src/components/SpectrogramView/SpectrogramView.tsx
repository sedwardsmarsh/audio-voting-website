// in this file, we assemble the view of two audio files for the user to playback. Each time this component loads, it provides two, new and unique, randomly selected sounds.
// 1. We get two Spectogram components.
import { Spectrogram } from "../Spectrogram/Spectrogram";
import { useSoundContext } from "@/pages/vote";
import { Canvas } from "@react-three/fiber";

export function SpectrogramView() {
  const soundIDPair = useSoundContext();
  if (soundIDPair == undefined) return null;
  return (
    <Canvas
      orthographic
      camera={{
        left: -3,
        right: 3,
        top: 2,
        bottom: -2,
        position: [0, 0, 10],
        zoom: 100,
      }}
      style={{ width: "350px", height: "150px" }}
    >
      <color args={["#666666"]} attach={"background"} />
      <Spectrogram sound_id={soundIDPair[0]} />
      <Spectrogram sound_id={soundIDPair[1]} />
    </Canvas>
  );
}
