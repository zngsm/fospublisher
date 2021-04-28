<template>
  <v-app>
    <v-main class="mx-auto">
      <Editor/>
    </v-main>
  </v-app>
</template>

<script>
import Editor from './components/Editor';

export default {
  name: 'App',
  components: {
    Editor,
  },

};
</script>
