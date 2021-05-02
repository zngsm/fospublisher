<template>
  <div>
    <h1>이것은 타임라인 페이지입니다.</h1>
    <TimeBody :totalTimelines="totalTimelines" class="timeline-body"/>
  </div>
</template>

<script>
import TimeBody from '../components/Timeline/TimeBody.vue';
export default {
  name: 'Timeline',
  components: {TimeBody},
  data() {
    return {
      totalTimelines: {
        0: [
          {
            status: "start",
            start: "1993-11-15T00:00:00.000Z",
          },
          {
            title: "TITLE_2002_1",
            id: 11,
            order: 0,
            check: true,
            year: 2002,
            status: "ing",
            idx: 1,
          },
          {
            title: "TITLE_2002_2",
            id: 13,
            order: 1,
            check: true,
            year: 2002,
            status: "ing",
            idx: 2,
          },
          {
            title: "TITLE_2002_3",
            id: 14,
            order: 2,
            check: true,
            year: 2002,
            status: "ing",
            idx: 3,
          },
          {
            title: "TITLE_2003_1",
            id: 15,
            order: 0,
            check: false,
            year: 2003,
            status: "ing",
            idx: 4,
          },
        ],
        1: [
          {
            title: "TITLE_2003_2",
            id: 16,
            order: 1,
            check: false,
            year: 2003,
            status: "ing",
            idx: 0,
          },
          {
            title: "TITLE_2004_1",
            id: 17,
            order: 0,
            check: false,
            year: 2004,
            status: "ing",
            idx: 1,
          },
          {
            title: "TITLE_2005_1",
            id: 18,
            order: 0,
            check: false,
            year: 2005,
            status: "ing",
            idx: 2,
          },
          {
            title: "TITLE_2006_1",
            id: 19,
            order: 0,
            check: false,
            year: 2006,
            status: "ing",
            idx: 3,
          },
          {
            title: "TITLE_2006_2",
            id: 20,
            order: 1,
            check: false,
            year: 2006,
            status: "ing",
            idx: 4,
          },
        ],
        2: [
          {
            title: "TITLE_2006_3",
            id: 21,
            order: 2,
            check: false,
            year: 2006,
            status: "ing",
            idx: 0,
          },
          {
            title: "TITLE_2007_1",
            id: 22,
            order: 0,
            check: false,
            year: 2007,
            status: "ing",
            idx: 1,
          },
          {
            title: "TITLE_2008_1",
            id: 23,
            order: 0,
            check: false,
            year: 2008,
            status: "ing",
            idx: 2,
          },
          {
            title: "TITLE_2009_1",
            id: 24,
            order: 0,
            check: false,
            year: 2009,
            status: "ing",
            idx: 3,
          },
          {
            title: "TITLE_20010_1",
            id: 25,
            order: 0,
            check: false,
            year: 2010,
            status: "ing",
            idx: 4,
          },
        ],
        3: [
          {
            title: "TITLE_2011_1",
            id: 26,
            order: 0,
            check: false,
            year: 2011,
            status: "ing",
            idx: 0,
          },
          {
            title: "TITLE_2012_1",
            id: 27,
            order: 0,
            check: false,
            year: 2012,
            status: "ing",
            idx: 1,
          },
          {
            title: "TITLE_2012_2",
            id: 28,
            order: 1,
            check: false,
            year: 2012,
            status: "ing",
            idx: 2,
          },
          {
            title: "TITLE_2012_3",
            id: 29,
            order: 2,
            check: false,
            year: 2012,
            status: "ing",
            idx: 3,
          },
          {
            title: "TITLE_2012_4",
            id: 30,
            order: 3,
            check: false,
            year: 2012,
            status: "ing",
            idx: 4,
          },
        ],
        4: [
          {
            title: "TITLE_2012_5",
            id: 31,
            order: 4,
            check: false,
            year: 2012,
            status: "ing",
            idx: 0,
          },
          {
            title: "TITLE_2012_6",
            id: 32,
            order: 5,
            check: false,
            year: 2012,
            status: "ing",
            idx: 1,
          },
          {
            title: "TITLE_2012_7",
            id: 33,
            order: 6,
            check: false,
            year: 2012,
            status: "ing",
            idx: 2,
          },
          {
            title: "TITLE_2012_8",
            id: 34,
            order: 7,
            check: false,
            year: 2012,
            status: "ing",
            idx: 3,
          },
          {
            title: "TITLE_2012_9",
            id: 35,
            order: 8,
            check: false,
            year: 2012,
            status: "ing",
            idx: 4,
          },
        ],
      5: [
          {
            title: "TITLE_2012_10",
            id: 36,
            order: 9,
            check: false,
            year: 2012,
            status: "ing",
            idx: 0,
          },
          {
            title: "TITLE_2012_11",
            id: 37,
            order: 10,
            check: false,
            year: 2012,
            status: "ing",
            idx: 1,
          },
          {
            status: "final",
          },
        ],
      }
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style>
.timeline-body {
  width: 1372px;
  margin: auto;
  position: relative
}
.timeline {
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 10;
  right: 0;
  margin-right: 187px;
}
.timeline-chapter {
  margin-top: -27px;
}
.timeline-reverse {
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  z-index: 10;
  right: 0;
  margin-right: 187px;
}
.timeline-img-road-start {
  width: 1131px;
  margin-top: 124px;
}
.timeline-img-start-station {
  width: 183px;
}
.timeline-img-road-right-left {
  width: 1304px;
  margin-right: 26px;
  margin-left: 42px;
  margin-top: -24px;
}
.timeline-img-road-left-right {
  width: 1288px;
  margin-right: 56px;
  margin-left: 28px;
  margin-top: -8px;
}
.timeline-img-road-final-right {
  width: 1331px;
  margin-left: 42px;
  margin-top: -8px;
}
.timeline-img-road-final-left {
  width: 1315px;
  margin-top: -9px;
}
.timeline-title {
  width: 150px;
  height: 60px;
  margin: 0 25px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.timeline-title-top {
  height: 50px;
}
.timeline-title-bottom {
  width: 15px;
  height: 30px;
  border-left: 1px solid;
  border-right: 1px solid;
  background-color: white;
  margin: auto
}
.timeline-year {
  color: white;
  margin: auto;
  background-color: brown;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -25px;
}
</style>