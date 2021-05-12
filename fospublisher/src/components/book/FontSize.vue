<template>
  <v-row>
    <v-select
      v-if="isRequired"
      :items="items"
      item-text="value"
      item-value="fontSize"
      label="* 폰트 크기"
      @input="sendFontSize"
      v-model="selectedItem"
    ></v-select>
    <v-select
      v-else
      :items="items"
      item-text="value"
      item-value="fontSize"
      label="폰트 크기"
      @input="sendFontSize"
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
        fontSize: 0,
        value: "20",
      },
      {
        fontSize: 1,
        value: "25",
      },
      {
        fontSize: 2,
        value: "30",
      },
      {
        fontSize: 3,
        value: "35",
      },
      {
        fontSize: 4,
        value: "40",
      },
    ],
  }),
  methods: {
    sendFontSize() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>
