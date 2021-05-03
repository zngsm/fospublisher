<template>
  <div>
    <div v-for="(timeline, id) in timelines" :key="id">
      <div v-if="idx == 0" class="timeline-title-top"></div>
      <div>
        <TimeChapter :timeline="timeline"/>
      </div>
      <div v-if="timeline.order == 0" class="timeline-year">
        {{timeline.year}}
      </div>
    </div>
  </div>
</template>

<script>
import TimeChapter from './TimeChapter.vue'
export default {
  name: 'Timenode',
  components: {TimeChapter},
  props: {
    timelines: Array,
    idx: String,
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>