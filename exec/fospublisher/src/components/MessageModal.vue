<template>
  <v-card
    class="justify-center d-flex align-content-space-around flex-wrap"
    min-height="20vh"
  >
    <v-card-title>
      <v-row class="justify-center">
        {{ headerTitle }}
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row class="justify-center">
        <strong><p v-html="bodyContent"></p></strong>
      </v-row>
    </v-card-text>

    <v-row class="justify-center" no-gutters>
      <v-card-actions>
        <v-btn small color="#231815" outlined @click="$emit('submit')">
          확인
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "MessageModal",
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
