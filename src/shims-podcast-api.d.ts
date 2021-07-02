declare module "podcast-api" {
  import {
    DateTime,
    Episode,
    Genre,
    Language,
    Podcast,
    Region,
  } from "@/services/listen-api/types";

  interface ListenApiClient {
    search(options: {
      q: string;
      sort_by_date?: boolean;
      type?: "episode" | "podcast" | "curated";
      offset?: number;
      len_min?: number;
      len_max?: number;
      /** comma separated List of Genre['id']*/
      genre_ids?: string;
      published_before?: DateTime;
      published_after?: DateTime;
      /** comma separated List of Fields: title description author audio */
      only_in?: string;
      language?: Language;
      safe_mode?: boolean;
    }): Promise<{ data: Episode }>;

    typeahead(): Promise<unknown>;

    fetchBestPodcasts(options?: {
      genre_id?: Genre["id"];
      page?: number;
      region?: Region;
      safe_mode?: boolean;
    }): Promise<{ data: { podcasts: Podcast[] } }>;

    fetchPodcastById(options: {
      id: string;
      next_episode_pub_date?: DateTime;
      sort?: "recent_first" | "oldest_first";
    }): Promise<{ data: Podcast }>;

    fetchEpisodeById(): Promise<unknown>;

    batchFetchPodcasts(): Promise<unknown>;

    batchFetchEpisodes(): Promise<unknown>;

    fetchCuratedPodcastsListById(): Promise<unknown>;

    fetchCuratedPodcastsLists(): Promise<unknown>;

    fetchPodcastGenres(): Promise<unknown>;

    fetchPodcastRegions(): Promise<unknown>;

    fetchPodcastLanguages(): Promise<unknown>;

    justListen(): Promise<{ data: Episode }>;

    fetchRecommendationsForPodcast(): Promise<unknown>;

    fetchRecommendationsForEpisode(): Promise<unknown>;

    fetchPlaylistById(): Promise<unknown>;

    fetchMyPlaylists(): Promise<unknown>;

    submitPodcast(): Promise<unknown>;

    deletePodcast(): Promise<unknown>;
  }

  export function Client(initializer: {
    apiKey: string | null;
  }): ListenApiClient;
}
