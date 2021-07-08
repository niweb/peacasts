<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { client } from "@/services/listen-api/client";
import { Podcast } from "@/services/listen-api/types";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ShowMoreText from "@/components/ShowMoreText.vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "PodcastDetail",
  components: { LoadingOverlay, ShowMoreText },
  setup() {
    const route = useRoute();
    const id = route.params.podcastId as string;
    const podcast = ref<Podcast>();

    onMounted(async () => {
      try {
        const response = await client.fetchPodcastById({ id });
        podcast.value = response.data;
      } catch (e) {
        console.error(e);
      }
    });

    return {
      dayjs,
      podcast,
      itunesUrl: computed(
        () =>
          `https://podcasts.apple.com/us/podcast/id${podcast.value?.itunes_id}`
      ),

      printDate(ms: number) {
        return dayjs(ms).format("MMM DD, YYYY");
      },

      printLength(seconds: number) {
        const min = Math.round(seconds / 60);
        return `${min} min`;
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
          <h1>{{ podcast.title }}</h1>
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
          <el-card
            v-for="episode in podcast.episodes"
            :key="episode.id"
            class="episode"
          >
            <div class="overline">
              <span class="release-date">
                {{ printDate(episode.pub_date_ms) }}
              </span>
              <span>{{ printLength(episode.audio_length_sec) }}</span>
            </div>
            <h2 class="title">{{ episode.title }}</h2>
            <ShowMoreText
              class="description"
              :text="episode.description"
            ></ShowMoreText>
          </el-card>
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
.episode {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .overline {
    font-size: smaller;
    margin-bottom: 0.4rem;
    color: $color-grey-600;

    :not(:last-child) {
      margin-right: 1rem;
    }
  }

  .title {
    font-size: 1.8rem;
  }

  .description {
    text-align: left;
    font-size: 1.1rem !important;
  }
}
</style>
