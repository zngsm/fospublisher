<template>
  <div>
    <Editor @updateContent="val => content = val" :content="content" :style-object="styleObject"/>
  </div>
</template>

<script>
import Editor from './components/Editor';

export default {
  name: 'App',
  data() {
    return {
      content: '<div>하하</div>',
      styleObject: {
        editorWidth: {
        },
        toolButton: {
        },
        toolButtonText: {
        },
        dropdownButton: {
        },
        modalButton: {
        },
        modalContent: {
        },
        modalTextInput: {
        },
        colorPickerButton: {
        },
        tooltip: {
        }
      }
    }
  },
  components: {
    Editor,
  },
};
</script>
