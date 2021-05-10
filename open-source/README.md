# @fospublisher/vue-text-editor

## 1. Introduction

> Vue.js text editor for writer
>
> Various features such as `export to PDF`, `pagination`, ` insert image`, `insert link`, etc.



## 2. Installation

```text
$ npm i @fospublisher/vue-text-editor
```



## 3. Usage

```vue
<template>
  <div>
    <Editor />
  </div>
</template>

<script>
import Editor from '@fospublisher/vue-text-editor'

export default {
  components: {
    Editor,
  },
}
</script>
```



## 4. Styling

### 4.1. Styling example

> *You can change editor style as below.* 
>
> *There are 9 different options, sush as* `editorWidth`*,* `toolButton`*,* `toolButtonText`*,* `dropdownButton`*,* `modalButton`*,* `modalContent`*,* `modalTextInput`*,* `colorPickerButton`*,* `tooltip`.

```vue
<template>
  <div>
    <Editor @updateContent="val => content = val" :style-object="styleObject"/>
  </div>
</template>

<script>
import Editor from './components/Editor';

export default {
  name: 'App',
  data() {
    return {
      content: '',
      styleObject: {
        editorWidth: {
          width: "1000px",
        },
        // toolButton: {
        //   backgroundColor: 'red'
        // },
        // toolButtonText: {
        // },
        // dropdownButton: {
        // },
        // modalButton: {
        // },
        // modalContent: {
        // },
        // modalTextInput: {
        // },
        // colorPickerButton: {
        // },
        // tooltip: {
        // }
      }
    }
  },
  components: {
    Editor,
  },
};
</script>
```

