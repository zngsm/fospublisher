<template>
  <div>
    <Editor class="mx-auto" @updateContent="val => content = val" :content="content" :style-object="styleObject"/>
  </div>
</template>

<script>
import Editor from 'fospublisher-vue-text-editor';

export default {
  name: 'Demo',
  data() {
    return {
      content: '',
      styleObject: {
       editorWidth: {
        },
        toolButton: {
          fontFamily: 'Arial',
          fontSize: '13.5px'
        },
        toolButtonText: {
          fontFamily: 'Arial',
          fontSize: '13.5px'
        },
        dropdownButton: {
          fontFamily: 'Arial',
          fontSize: '13.5px'
        },
        modalButton: {
        },
        modalContent: {
          fontFamily: 'Arial',
        },
        modalTextInput: {
        },
        colorPickerButton: {
          fontFamily: 'Arial',
        },
        tooltip: {
          fontFamily: 'Arial',
          paddingBottom: '3px',
          fontSize: '11px'
        }
      }
    }
  },
  components: {
    Editor,
  },
  mounted() {
    document.getElementsByClassName('v-main__wrap')[0].style.backgroundColor = 'white'
  },
};
</script>
