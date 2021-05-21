<template>
  <v-row>
    <v-select
      v-if="isRequired"
      :items="items"
      item-text="value"
      item-value="skin"
      label="* 스킨"
      @input="sendSkin"
      v-model="selectedItem"
    ></v-select>
    <v-select
      v-else
      :items="items"
      item-text="value"
      item-value="skin"
      label="스킨 컬러"
      @input="sendSkin"
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
        skin: 0,
        value: "diary",
      },
      {
        skin: 1,
        value: "soft",
      },
      {
        skin: 2,
        value: "flower",
      },
      {
        skin: 3,
        value: "goldFrame",
      },
    ],
  }),
  methods: {
    sendSkin() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>
