<template>
  <div class="text-center" v-click-outside="closeModal">
    <v-dialog v-model="openExportModal" persistent width="500">
      <v-card class="py-1" min-height="20vh">
        <v-card-title>
          <v-row class="justify-center" style="fontSize: 30px;">
            {{ headerTitle }}
          </v-row>
        </v-card-title>

        <v-card-text class="modal-export">
          <v-row class="justify-center">
            <v-btn color="#231815" outlined @click="exportWord">
              <img
                src="https://img.icons8.com/color/30/000000/word.png"
              />Word로 추출하기
            </v-btn>
          </v-row>
        </v-card-text>

        <v-row class="justify-center" no-gutters>
          <v-card-actions>
            <v-btn
              large
              v-if="concept !== 'export'"
              color="#231815"
              outlined
              @click="confirmModal"
            >
              확인
            </v-btn>
            <v-btn color="#231815" outlined @click="closeModal">
              취소
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    concept: String,
    openExportModal: Boolean,
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
    confirmModal() {
      this.$emit("confirmModal");
    },
    exportWord() {
      this.$emit("exportWord");
    },
  },
};
</script>
<style>
.modal-position {
  position: fixed;
  /* left: -50px; */
  top: 0px;
  z-index: 100;
}
.modal-export {
  margin: 30px 0px 10px 0px;
}
</style>
