export type soundIdSupabaseResponse = {
  data: {
    sound_id: string;
  }[];
};

export type freesoundPreviews = {
  previews: {
    "preview-hq-mp3": string;
    "preview-hq-ogg": string;
    "preview-lq-mp3": string;
    "preview-lq-ogg": string;
  };
};
