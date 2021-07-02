export type Podcast = {
  id: string;
  image: Url;
  title: string;
  publisher: string;
  thumbnail: Url;
  listennotes_url: Url;
  itunes_id: number;
  language: Language;
  country: Region;
  genre_ids: Genre[];
  latest_pub_date_ms: DateTime;
  earliest_pub_date_ms: DateTime;
  total_episodes: number;
  website: Url;
  extra: {
    twitter_handle: Url;
    facebook_handle: Url;
    instagram_handle: Url;
    wechat_handle: Url;
    patreon_handle: Url;
    youtube_url: Url;
    linkedin_url: Url;
    spotify_url: Url;
    google_url: Url;
    url1: Url;
    url2: Url;
    url3: Url;
  };
  episodes: Episode[];
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
