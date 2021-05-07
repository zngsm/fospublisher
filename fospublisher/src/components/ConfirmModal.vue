<template>
  <v-card>
    <v-card-title class="headline">
      {{ headerTitle }}
    </v-card-title>

    <v-card-text>
      {{ bodyContent }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn small color="#231815" outlined @click="$emit('stayHere')">
        취소
      </v-btn>

      <v-btn small color="#231815" outlined @click="$emit('goToNext')">
        확인
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
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
};
</script>
