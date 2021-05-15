<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-if="!editMode">
        <v-text-field
          v-model="birthday"
          label="* 생 일"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </div>
      <div v-else>
        <v-text-field
          v-model="birthday"
          label="생 일"
          append-icon="mdi-calendar"
          rounded
          outlined
          dense
          hide-details
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </div>
    </template>
    <v-date-picker
      ref="picker"
      header-color="#231815"
      v-model="birthday"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { checkUserInfo } from "@/api/account";
export default {
  data: () => ({
    birthday: null,
    menu: false,
  }),
  props: {
    editMode: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(birthday) {
      this.$refs.menu.save(birthday);
      this.$emit("birthday", this.birthday);
    },

    getUserInfo() {
      checkUserInfo(
        (res) => {
          if (res.status === 200) {
            this.birthday = res.data.user.birthday.substr(0, 10);
          }
        },
        () => {
          return;
        }
      );
    },
  },
  mounted() {
    // 회원정보 수정 시 기존 이미지 불러오기
    if (this.editMode) {
      this.getUserInfo();
    }
  },
};
</script>
