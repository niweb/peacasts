<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { client } from "@/services/listen-api/client";
import { Podcast } from "@/services/listen-api/types";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ShowMoreText from "@/components/ShowMoreText.vue";
import EpisodeCard from "@/components/EpisodeCard.vue";
import {
  addPodcast,
  isPodcastAdded,
  removePodcast,
} from "@/services/storage/podcasts";

export default defineComponent({
  name: "PodcastDetail",
  components: { EpisodeCard, LoadingOverlay, ShowMoreText },
  setup() {
    const route = useRoute();
    const id = route.params.podcastId as string;
    const podcast = ref<Podcast>();
    const isAdded = ref<boolean | null>(null);

    onMounted(async () => {
      try {
        const response = await client.fetchPodcastById({ id });
        podcast.value = response.data;
      } catch (e) {
        console.error(e);
      }
    });

    watch(podcast, async () => {
      if (podcast.value) {
        isAdded.value = await isPodcastAdded(podcast.value.id);
      }
    });

    return {
      podcast,
      itunesUrl: computed(
        () =>
          `https://podcasts.apple.com/us/podcast/id${podcast.value?.itunes_id}`
      ),

      isAdded,

      add: async () => {
        if (podcast.value) {
          await addPodcast(podcast.value);
          isAdded.value = true;
        } else {
          console.error("Sorry, something went wrong.");
        }
      },

      remove: async () => {
        if (podcast.value) {
          await removePodcast(podcast.value.id);
          isAdded.value = false;
        } else {
          console.error("Sorry, something went wrong.");
        }
      },
    };
  },
});
</script>

<template>
  <LoadingOverlay :show="!podcast">
    <div v-if="podcast" class="root">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-image :src="podcast.image" class="image"></el-image>
          <p class="total-episodes">{{ podcast.total_episodes }} Episodes</p>
          <ShowMoreText
            class="description"
            :text="podcast.description"
            :lines="6"
          ></ShowMoreText>
        </el-col>
        <el-col :span="16">
          <div class="headline-wrapper">
            <h1>{{ podcast.title }}</h1>
            <el-button
              v-if="isAdded"
              type="primary"
              icon="el-icon-check"
              circle
              aria-label="Remove from your podcasts"
              @click="remove"
            ></el-button>
            <el-button
              v-else
              type="primary"
              icon="el-icon-plus"
              circle
              aria-label="Add to your podcasts"
              @click="add"
            ></el-button>
          </div>
          <div class="references">
            <div>
              <i class="el-icon-mic icon"></i
              ><span>{{ podcast.publisher }}</span>
            </div>
            <div>
              <material-icon class="icon">language</material-icon>
              <a :href="podcast.website">Visit website</a>
            </div>
            <div>
              <material-icon class="icon">podcasts</material-icon>
              <a :href="itunesUrl">Apple Podcasts</a>
            </div>
          </div>
          <EpisodeCard
            v-for="episode in podcast.episodes"
            :key="episode.id"
            class="episode"
            :episode="episode"
          >
          </EpisodeCard>
        </el-col>
      </el-row>
    </div>
  </LoadingOverlay>
</template>

<style lang="scss" scoped>
.root {
  max-width: 900px;
  margin: 3rem auto auto;
}
.image {
  width: 100%;
  margin-bottom: 1rem;
}
.total-episodes {
  margin-bottom: 1rem;
  color: $color-grey-600;
}
.headline-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.references {
  display: flex;
  align-items: baseline;
  color: $color-grey-600;
  :not(:last-child) {
    margin-right: 1.5rem;
  }
  .icon {
    margin-right: 0.5rem;
  }
  font-size: 1rem;
  margin-bottom: 1.8rem;
}
.episode:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>
