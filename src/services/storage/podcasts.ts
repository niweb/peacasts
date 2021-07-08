import * as localforage from "localforage";
import { Podcast } from "@/services/listen-api/types";

/**
 * Stores all Podcasts, that the user subscribed to */
const PodcastTable = localforage.createInstance({
  name: "Peacasts",
  storeName: "Podcasts",
});

const serialize = JSON.stringify;
const deserialize = (podcast: string | null): Podcast | null => {
  return podcast ? JSON.parse(podcast) : null;
};

export const addPodcast = (podcast: Podcast): Promise<string> =>
  PodcastTable.setItem(podcast.id, serialize(podcast));

export const removePodcast = (podcastId: Podcast["id"]): Promise<void> =>
  PodcastTable.removeItem(podcastId);

export const getPodcast = async (
  podcastId: Podcast["id"]
): Promise<Podcast | null> =>
  deserialize(await PodcastTable.getItem(podcastId));

export const isPodcastAdded = async (
  podcastId: Podcast["id"]
): Promise<boolean> => (await getPodcast(podcastId)) !== null;

export const getAllPodcastIds = (): Promise<Podcast["id"][]> =>
  PodcastTable.keys();

export const getAllPodcasts = async (): Promise<
  Record<Podcast["id"], Podcast>
> => {
  const result: Record<Podcast["id"], Podcast> = {};
  try {
    await PodcastTable.iterate<string, void>((value, key) => {
      result[key] = JSON.parse(value) as Podcast;
    });
  } catch (e) {
    console.error("Could not read from Database", e);
  }
  return result;
};
