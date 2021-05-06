<template>
  <div>
    <v-row class="text-h3 text-center">{{ name }}님의 인생 일대기 </v-row>
    <v-btn v-if="!edit" @click="changeEditMode">편집모드</v-btn>
    <v-btn v-else @click="changeEditMode">완료</v-btn>
    <TimeBody
      :totalTimelines="totalTimelines"
      :birth="birth"
      :name="name"
      class="timeline-body"
    />
    <v-row justify="center">
      <v-dialog v-model="edit" width="600px">
        <TimeEditModal v-if="edit" @getTimeline="getTimeline" />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import TimeBody from "../components/Timeline/TimeBody.vue";
import { readTimeline } from "../api/timeline.js";
import "../assets/css/timeline.css";
import { mapState } from "vuex";
import TimeEditModal from "../components/Timeline/TimeEditModal.vue";

export default {
  name: "Timeline",
  components: { TimeBody, TimeEditModal },
  data() {
    return {
      totalTimelines: null,
      birth: null,
      name: null,
      dialogue: false,
    };
  },
  created() {
    this.getTimeline();
  },
  mounted() {},
  methods: {
    getTimeline() {
      readTimeline(
        (res) => {
          console.log(res.data);
          this.totalTimelines = res.data.data;
          this.birth = res.data.birth;
          this.name = res.data.name;
        },
        (err) => {
          console.err(err);
        }
      );
    },
    changeEditMode() {
      this.$store.commit("timeline/setEditMode", !this.edit);
    },
  },
  computed: {
    ...mapState({
      edit: (state) => state.timeline.edit,
    }),
  },
};
</script>

<style></style>
