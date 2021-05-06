export type Podcast = {
  id: string;
  image: Url;
  title: string;
  publisher: string;
  thumbnail: Url;
  listen_score: number;
  listennotes_url: Url;
  listen_score_global_rank: string;
};

export type Episode = {
  id: string;
  link: Url;
  audio: Url;
  image: Url;
  title: string;
  podcast: Podcast;
  thumbnail: Url;
  description: HTMLElement;
  pub_date_ms: DateTime;
  guid_from_rss: Url;
  listennotes_url: Url;
  audio_length_sec: number;
  explicit_content: false;
  maybe_audio_invalid: false;
  listennotes_edit_url: Url;
};

export type Genre = {
  id: number;
  name: string;
  parent_id: Genre["id"];
};

export type Region = "us";
export type Language = "English";

export type Url = string;
export type DateTime = number;
