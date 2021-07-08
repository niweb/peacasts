<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Episode } from "@/services/listen-api/types";
import dayjs from "dayjs";
import ShowMoreText from "@/components/ShowMoreText.vue";

export default defineComponent({
  name: "EpisodeCard",

  components: {
    ShowMoreText,
  },

  props: {
    episode: {
      required: true,
      type: Object as PropType<Episode>,
    },
  },

  setup() {
    return {
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
  <el-card class="root">
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
</template>

<style lang="scss" scoped>
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
</style>
