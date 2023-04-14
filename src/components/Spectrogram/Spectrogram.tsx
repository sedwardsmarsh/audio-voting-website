// in this file, we'll chose a random audio file (of 10) from supabase and present it to the user. John recommends using three.js for rendering the FFT spectogram.
// 1. We get the audio file from supabase
// 2. We render the spectrogram for the audio file
// 3. We put a playback button on top of the spectrogram

import { useEffect, useState } from "react";
import { freesoundPreviews } from "@/types/types";

const freesoundKey = process.env.NEXT_PUBLIC_FREESOUND_API_KEY;

/**
 * fetches an mp3 preview url from freesound using a sound_id
 * @param {string} sound_id - freesound sound identifier
 * @return {Promise<string>} audio preview url
 */
async function getPreviewUrl(sound_id: string): Promise<string> {
  const freesoundUrl = `https://freesound.org/apiv2/sounds/${sound_id}/?fields=previews&token=${freesoundKey}`;
  const freesound_response = await fetch(freesoundUrl);
  const freesound_previews: freesoundPreviews = await freesound_response.json();
  const hq_mp3_preview = freesound_previews["previews"]["preview-hq-mp3"];

  return hq_mp3_preview;
}

export function Spectrogram(props: { sound_id: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  // wait for the freesoundUrl to resolve
  useEffect(() => {
    async function fetchPreviewUrl() {
      const freeSoundIDs = await getPreviewUrl(props.sound_id);
      setPreviewUrl(freeSoundIDs);
    }
    fetchPreviewUrl();
  }, [props.sound_id]);

  // just for printing the loaded url
  useEffect(() => {
    console.log(previewUrl);
  }, [previewUrl]);

  return (
    <audio controls preload="metadata">
      <source src={previewUrl} type="audio/mpeg"></source>
      Your browser does not support the audio tag.
    </audio>
  );
}
