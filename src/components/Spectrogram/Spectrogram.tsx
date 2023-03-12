// in this file, we'll chose a random audio file (of 10) from supabase and present it to the user. John recommends using three.js for rendering the FFT spectogram.
// 1. We get the audio file from supabase
// 2. We render the spectrogram for the audio file
// 3. We put a playback button on top of the spectrogram

type SpectrogramProps = {
  updateSound: boolean;
}

export function Spectrogram({ updateSound }: SpectrogramProps) {
  console.log("Spectrogram: ", updateSound);

  return <p>updateSound: {updateSound ? "true" : "false"}</p>;
}
