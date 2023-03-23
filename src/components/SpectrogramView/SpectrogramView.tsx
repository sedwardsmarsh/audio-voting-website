// in this file, we assemble the view of two audio files for the user to playback. Each time this component loads, it provides two, new and unique, randomly selected sounds.
// 1. We get two Spectogram components.
import { Spectrogram } from "../Spectrogram/Spectrogram";
import { useSoundContext } from "@/pages/vote";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

export function SpectrogramView() {
  const supabaseContext = useSessionContext();
  const supabaseClient = supabaseContext.supabaseClient;

  const sounds = useSoundContext();
  return (
    <div>
      <Spectrogram sound={sounds[0]} />
      <Spectrogram sound={sounds[1]} />
    </div>
  );
}
