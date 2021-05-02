<template>
  <div>
    <div v-for="(timeline, id) in timelines" :key="id">
      <div v-if="idx == 0" class="timeline-title-top"></div>
      <div v-if="timeline.status == 'start'">
        <div class="timeline-title">
          시작점1111
        </div>
        <div class="timeline-title-bottom"></div>
      </div>
      <div v-else-if="timeline.order == 0">
        <div>
          <div class="timeline-title">
            {{ timeline.title }}
          </div>
          <div class="timeline-title-bottom"></div>
        </div>
        <div class="timeline-year">
          {{timeline.year}}
        </div>
      </div>
      <div v-else>
        <div class="timeline-title">
          {{ timeline.title }}
        </div>
        <div class="timeline-title-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timenode',
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