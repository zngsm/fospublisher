<template>
  <div>
    <div v-for="(timeline, id) in timelines" :key="id">
      <div v-if="idx == 0" class="timeline-title-top"></div>
      <div>
        <TimeChapter :timeline="timeline" />
      </div>
      <div
        v-if="timeline.order == 0"
        class="timeline-year"
        :class="{ 'timeline-year-hover': !edit }"
      >
        {{ timeline.year }}
      </div>
    </div>
  </div>
</template>

<script>
import TimeChapter from "./TimeChapter.vue";
import { mapState } from "vuex";
export default {
  name: "Timenode",
  components: { TimeChapter },
  props: {
    timelines: Array,
    idx: String,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapState({
      edit: (state) => state.timeline.edit,
    }),
  },
};
</script>

<style scoped></style>
