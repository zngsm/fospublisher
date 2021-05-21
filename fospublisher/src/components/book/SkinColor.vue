<template>
  <v-row>
    <v-select
      v-if="isRequired"
      :items="items"
      item-text="value"
      item-value="skinColor"
      label="* 스킨 컬러"
      @input="sendSkinColor"
      v-model="selectedItem"
    ></v-select>
    <v-select
      v-else
      :items="items"
      item-text="value"
      item-value="skinColor"
      label="스킨 컬러"
      @input="sendSkinColor"
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
        skinColor: 0,
        value: "파랑",
      },
      {
        skinColor: 1,
        value: "보라",
      },
      {
        skinColor: 2,
        value: "초록",
      },
    ],
  }),
  methods: {
    sendSkinColor() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>
