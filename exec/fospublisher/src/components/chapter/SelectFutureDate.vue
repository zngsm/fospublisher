<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="미래의 날짜를 선택해주세요"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="date"
        :min="minDate"
        @change="selectDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "Selectfuturedate",
  data() {
    return {
      menu: false,
      date: this.futureDate,
    };
  },
  props: {
    minDate: String,
    futureDate: String,
  },
  mounted() {},
  methods: {
    selectDate(date) {
      this.$refs.menu.save(date);
      this.$emit("changeDate", this.date);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>

<style lang="scss" scoped></style>
