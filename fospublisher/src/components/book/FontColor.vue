<template>
  <v-row>
    <v-select
      v-if="isRequired"
      :items="items"
      item-text="value"
      item-value="fontColor"
      label="* 폰트 컬러"
      @input="sendFontColor"
      v-model="selectedItem"
    ></v-select>
    <v-select
      v-else
      :items="items"
      item-text="value"
      item-value="fontColor"
      label="폰트 컬러"
      @input="sendFontColor"
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
        fontColor: 0,
        value: "하양",
      },
      {
        fontColor: 1,
        value: "검정",
      },
    ],
  }),
  methods: {
    sendFontColor() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>
