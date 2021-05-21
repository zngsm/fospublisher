<template>
  <div class="text-center" v-click-outside="closeModal">
    <v-dialog v-model="openTodayModal" persistent width="500">
      <v-card class="py-1" min-height="20vh">
        <v-card-title>
          <v-row class="justify-center" style="fontSize: 30px;">
            과거에서 온 오늘의 기록
          </v-row>
        </v-card-title>

        <v-card-text class="modal-export">
          <v-row class="justify-center">
            <div v-if="!todayData">
              없습니다.
            </div>
            <div v-else>
              <v-list>
                <v-list-item
                  v-for="(item, idx) in todayData"
                  :key="idx"
                  @click="goToTodayFuture(item.id)"
                >
                  {{ item.title }}
                </v-list-item>
              </v-list>
            </div>
            <div></div>
          </v-row>
        </v-card-text>

        <v-row class="justify-center" no-gutters>
          <v-card-actions>
            <v-btn color="#231815" outlined @click="closeModal">
              닫기
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SelectModal",
  props: {
    openTodayModal: Boolean,
    headerTitle: {
      type: String,
      require: false,
    },
    bodyContent: {
      type: String,
      require: false,
    },
    moveTo: {
      type: String,
      require: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    goToTodayFuture(id) {
      this.$emit("goToTodayFuture", id);
    },
  },
  computed: {
    ...mapState({
      todayData: (state) => state.book.todayData,
    }),
  },
};
</script>
<style>
.modal-export {
  margin: 30px 0px 10px 0px;
}
</style>
