<script>
import Vue from 'vue';
import FospublisherVueTextEditor from '@/fospublisher-vue-text-editor.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FospublisherVueTextEditor
  }
});
</script>

<template>
  <div id="app">
    <fospublisher-vue-text-editor />
  </div>
</template>
