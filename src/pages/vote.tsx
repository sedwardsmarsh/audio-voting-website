// This component will maintain state that updates when either vote button is pressed. When either button is pressed, the tally for that sound will increment and the spectogram view will refresh.
import { VoteButton } from "@/components/VoteButton";
import { SpectrogramView } from "@/components/SpectrogramView";
import { soundIdSupabaseResponse, freesoundPreviews } from "@/types/types";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";

/**
 * asynchronously fetches all the sound_id's from supabase as a string array.
 * @return {Promise<string[]>} array of sound_id's.
 */
async function getAllSupabaseSoundIDs(): Promise<string[]> {
  // get soundID blob from supabase
  const sound_ids = await fetch("api/allSoundsRandomOrder");
  const supabase_response: soundIdSupabaseResponse = await sound_ids.json();

  // separate soundID blob into individual sound id's
  let soundIDs = [];
  for (let i = 0; i < supabase_response["data"].length; i++) {
    const sound_id = supabase_response["data"][i]["sound_id"];
    soundIDs.push(sound_id);
  }

  return soundIDs;
}

// create sound context. this will store the pair of selected sounds.
const SoundContext = createContext<[string, string] | undefined>(undefined);
export const useSoundContext = () => useContext(SoundContext);

export default function Vote() {
  // all sound IDs
  const [allSoundIDs, setAllSoundIDs] = useState<string[] | undefined>();
  // previously used sounds in the database
  const [prevUsedSounds, setPrevUsedSounds] = useState<string[]>([]);
  // available sounds, updated whenever allSoundIDs or prevUsedSounds updates
  const availableSounds = useMemo(
    () => allSoundIDs?.filter((id) => !prevUsedSounds.includes(id)),
    [allSoundIDs, prevUsedSounds]
  );
  // chosen sounds, the selected pair of sound ids. updated whenever
  // availableSounds updates.
  const chosenSounds: [string, string] | undefined = useMemo(() => {
    if (availableSounds && availableSounds.length >= 2) {
      return [availableSounds[0], availableSounds[1]];
    }
  }, [availableSounds]);

  // synchronizing local state with fetched ids
  // fetches during the initial render
  useEffect(() => {
    async function fetchSoundUrls() {
      const freeSoundIDs = await getAllSupabaseSoundIDs();
      setAllSoundIDs(freeSoundIDs);
    }
    fetchSoundUrls();
  }, []);

  return (
    <SoundContext.Provider value={chosenSounds}>
      <div>
        <SpectrogramView />
        <button
          onClick={() => {
            // TODO: handle vote mechanism
            if (chosenSounds) {
              setPrevUsedSounds((prev) => [...prev, ...chosenSounds]);
            }
          }}
        >
          Vote!
        </button>
      </div>
    </SoundContext.Provider>
  );
}
