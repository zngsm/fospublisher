# fospublisher-vue-text-editor

## 1. Introduction

> Vue.js text editor for writer
>
> Various features such as `export to PDF`, `pagination`, ` insert image`, `insert link`, etc.

![](https://autobiography.s3.ap-northeast-2.amazonaws.com/1620796034308.gif)

## 2. Installation

```text
$ npm i fospublisher-vue-text-editor
```



## 3. Usage

> You can type HTML tag in content as initial value.
>
> `ex. content: '<div>Hello!<div>'`

```vue
<template>
  <div>
    <Editor @updateContent="val => content = val" :content="content" :style-object="styleObject"/>
  </div>
</template>

<script>
import Editor from 'fospublisher-vue-text-editor';

export default {
  name: 'App',
  data() {
    return {
      content: '',
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
```



## 4. Styling

### 4.1. Styling example

> *There are 9 different options, sush as* `editorWidth`*,* `toolButton`*,* `toolButtonText`*,* `dropdownButton`*,* `modalButton`*,* `modalContent`*,* `modalTextInput`*,* `colorPickerButton`*,* `tooltip`.
>
> *Even if you don't change the styling, you need to keep the code structure of the styleObject.*
>
> *You can change editor style as below.* 

![](https://autobiography.s3.ap-northeast-2.amazonaws.com/1620795983904.PNG)

```vue
<template>
  <div>
    <Editor @updateContent="val => content = val" :content="content" :style-object="styleObject"/>
  </div>
</template>

<script>
import Editor from 'fospublisher-vue-text-editor';

export default {
  name: 'App',
  data() {
    return {
      content: '',
      styleObject: {
       editorWidth: {
          width: "1000px",
        },
        toolButton: {
        },
        toolButtonText: {
        },
        dropdownButton: {
          backgroundColor: 'red'
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
```

