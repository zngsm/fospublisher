<template>
  <v-row>
    <v-select
      v-if="isRequired"
      :items="items"
      item-text="value"
      item-value="font"
      label="* 폰트"
      @input="sendFont"
      v-model="selectedItem"
    ></v-select>
    <v-select
      v-else
      :items="items"
      item-text="value"
      item-value="font"
      label="폰트"
      @input="sendFont"
      v-model="selectedItem"
    ></v-select>
  </v-row>
</template>

<script>
export default {
  name: "MessageModal",
  props: {
    isRequired: {
      type: Boolean,
      require: false,
    },
  },
  data: () => ({
    selectedItem: null,
    items: [
      {
        font: 0,
        value: "국대",
      },
      {
        font: 1,
        value: "관동별곡",
      },
    ],
  }),
  methods: {
    sendFont() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>
