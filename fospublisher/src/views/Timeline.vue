<template>
  <div>
    <h1>이것은 타임라인 페이지입니다.</h1>
    <TimeBody :totalTimelines="totalTimelines" :birth="birth" :name="name" class="timeline-body"/>
  </div>
</template>

<script>
import TimeBody from '../components/Timeline/TimeBody.vue';
import { readTimeline } from '../api/timeline.js';
import "../assets/css/timeline.css";
// import "../../assets/css/timeline.css";
export default {
  name: 'Timeline',
  components: {TimeBody},
  data() {
    return {
      totalTimelines: null,
      birth: null,
      name: null,
    };
  },
  created() {
    this.getTimeline();
  },
  mounted() {
    
  },
  methods: {
    getTimeline () {
      readTimeline(
        (res) => {
          console.log(res.data)
          this.totalTimelines = res.data.data;
          this.birth = res.data.birth;
          this.name = res.data.name;
        },
        (err) => {console.err(err)}
      )
    },
  },
};
</script>

<style>

</style>