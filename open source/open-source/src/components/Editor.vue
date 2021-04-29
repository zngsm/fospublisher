<template>
  <body style="width: 1000px;">
  <div class="d-flex flex-wrap align-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('bold')">
          <i class="fas fa-bold"></i>
        </v-btn>
      </template>
      <span>굵게</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('italic')">
          <i class="fas fa-italic"></i>
        </v-btn>
      </template>
      <span>기울임꼴</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('underline')">
          <i class="fas fa-underline"></i>
        </v-btn>
      </template>
      <span>밑줄</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('strikethrough')">
          <i class="fas fa-strikethrough"></i>
        </v-btn>
      </template>
      <span>취소선</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('justifyLeft')">
          <i class="fas fa-align-left"></i>
        </v-btn>
      </template>
      <span>왼쪽 정렬</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('justifyCenter')">
          <i class="fas fa-align-center"></i>
        </v-btn>
      </template>
      <span>가운데 정렬</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('justifyRight')">
          <i class="fas fa-align-right"></i>
        </v-btn>
      </template>
      <span>오른쪽 정렬</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('justifyFull')">
          <i class="fas fa-align-justify"></i>
        </v-btn>
      </template>
      <span>양쪽 맞춤</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('cut')">
          <i class="fas fa-cut"></i>
        </v-btn>
      </template>
      <span>잘라내기</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('copy')">
          <i class="fas fa-copy"></i>
        </v-btn>
      </template>
      <span>복사하기</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('indent')">
          <i class="fas fa-indent"></i>
        </v-btn>
      </template>
      <span>들여쓰기</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('outdent')">
          <i class="fas fa-outdent"></i>
        </v-btn>
      </template>
      <span>내어쓰기</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('subscript')">
          <i class="fas fa-subscript"></i>
        </v-btn>
      </template>
      <span>아래 첨자</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('superscript')">
          <i class="fas fa-superscript"></i>
        </v-btn>
      </template>
      <span>위 첨자</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('undo')">
          <i class="fas fa-undo"></i>
        </v-btn>
      </template>
      <span>취소</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('redo')">
          <i class="fas fa-redo"></i>
        </v-btn>
      </template>
      <span>다시 실행</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('insertUnorderedList')">
          <i class="fas fa-list-ul"></i>
        </v-btn>
      </template>
      <span>글머리 기호</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('insertOrderedList')">
          <i class="fas fa-list-ol"></i>
        </v-btn>
      </template>
      <span>번호 매기기</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('insertParagraph')">
          <i class="fas fa-paragraph"></i>
        </v-btn>
      </template>
      <span>줄바꿈</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile fab small v-bind="attrs" v-on="on" @click="execCmd('insertHorizontalRule')">
          HR
        </v-btn>
      </template>
      <span>가로선</span>
    </v-tooltip>
    
    <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
        <v-btn
          text 
          tile 
          fab 
          small
          v-bind="attrs"
          v-on="on"
          @click="linkModal = true"
        >
          <i class="fas fa-link"></i>
        </v-btn>
      </template>
      <span>링크</span>
    </v-tooltip>
    <v-dialog
      v-model="linkModal"
      width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Link
        </v-card-title>

        <v-text-field
          class="mx-4 my-5"
          v-model="pageLink"
          label="Insert link"
          outlined
          dense
          clearable
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="inserLink"
          >
            okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="emoji-trigger" 
          text 
          tile 
          small 
          v-bind="attrs"
          v-on="on"
          class="py-5 px-0" 
        >
          <h2>😀</h2>
        </v-btn>
      </template>
      <span>이모티콘</span>
    </v-tooltip>
    
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on: onMenu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: onTooltip }">
              <v-btn
                text 
                tile 
                small 
                class="py-5" 
                v-on="{ ...onMenu, ...onTooltip }"
              >
                Font Style ▾
              </v-btn>
            </template>
            <span>글꼴</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in fontStyle"
            :key="index"
            link
          >
            <v-list-item-title @click="execCommandWithArg('fontName', item)" :style="{ 'font-family': [item]}">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="text-center">
      <v-menu offset-y :close-on-click="true">
        <template v-slot:activator="{ on: onMenu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: onTooltip }">
              <v-btn
                text 
                tile 
                small 
                class="py-5" 
                v-on="{ ...onMenu, ...onTooltip }"
              >
                Font size ▾
              </v-btn>
            </template>
            <span>글꼴 크기</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in fontSize"
            :key="index"
            link
          >
            <v-list-item-title @click="execCommandWithArg('formatBlock', item)">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-btn text tile small class="py-5" disabled >Font Color</v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <input v-bind="attrs" v-on="on" style="cursor: pointer" type="color" @change="execCommandWithArg('foreColor', $event.target.value);"/>
      </template>
      <span>글꼴 색</span>
    </v-tooltip>
    <v-btn text tile small class="py-5" disabled >Background Color </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <input v-bind="attrs" v-on="on" style="cursor: pointer" type="color" @change="execCommandWithArg('hiliteColor', $event.target.value);"/>
      </template>
      <span>텍스트 강조 색</span>
    </v-tooltip>
    
    <v-dialog
      v-model="imageModal"
      width="500"
    >
    <template v-slot:activator="{ on: onModal }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: onTooltip }">
        <v-btn
          text 
          tile 
          small
          v-on="{ ...onModal, ...onTooltip }"
          class="py-5"
        >
          <i class="fas fa-file-image pr-1"></i>image
        </v-btn>
      </template>
      <span>이미지 삽입</span>
      </v-tooltip>
    </template>

      <v-card>
        <v-card-title class="headline">
          Image upload
        </v-card-title>

        <v-file-input
          class="mx-4 mt-5"
          v-model="imageFile"
          label="File input"
          outlined
          dense
        ></v-file-input>
        <v-text-field
          class="mx-4"
          v-model="imageLink"
          label="Image link"
          outlined
          dense
          clearable
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="insertImage"
          >
            Okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile small v-bind="attrs" v-on="on" class="py-5" @click="execCmd('selectAll')">
          Select All
        </v-btn>
      </template>
      <span>전부 선택</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile small v-bind="attrs" v-on="on" class="py-5" @click="exportToPDF()">
          <i class="fas fa-file-pdf pr-1"></i>PDF
        </v-btn>
      </template>
      <span>PDF 추출</span>
    </v-tooltip>
    <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text tile small v-bind="attrs" v-on="on" class="py-5" @click="exportToWord()">
          <i class="fas fa-file-word pr-1"></i>Word
        </v-btn>
      </template>
      <span>Word 추출</span>
    </v-tooltip> -->
   
  </div>

  <iframe name="richTextField" style="width: 1000px; height: 500px; border: solid #D1D1D1 1px; border-radius: 3px;"></iframe>
  </body>
</template>

<script>
import { EmojiButton } from '@joeattardi/emoji-button';
import html2pdf from 'html2pdf.js'
import $ from 'jquery'
require('jquery');
require('jquery-ui-bundle');

export default {
  data() {
    return {
      isInEditMode: true,
      fontSize: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      fontStyle: ['돋움', '굴림', '바탕','궁서', '맑은 고딕'],
      // fontStyle: ['Arial', 'Comic Sans MS', 'Courier', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana'],
      imageModal: false,
      imageFile: [],
      imageLink: '',
      imageNum: 0,
      linkModal: false,
      pageLink: '',
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    inserLink() {
      this.linkModal = false
      if (this.pageLink != '') {
        this.execCommandWithArg('createLink', this.pageLink)
        const links = window.richTextField.document.querySelectorAll('a')
        links.forEach(item => {
          item.target = '_blank';
          item.addEventListener('mouseover', () => {
            window.richTextField.document.designMode = 'Off'
          });
          item.addEventListener('mouseout', () => {
            window.richTextField.document.designMode = 'On'
          });
        })
        this.pageLink = ''
      }
    },
    insertImage() {
      this.imageModal = false
      if (this.imageFile.length != 0) {
        var file = this.imageFile
        var reader = new FileReader();
        var image = new Image();
        var vm = this
        reader.onloadend = function() {
          image.src = reader.result
          window.richTextField.document.getElementsByTagName('body')[0].appendChild(image)
          image.style.maxWidth = '100%'
          image.setAttribute('id', vm.imageNum)

          $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).wrap(`<div id="draggableHelper${vm.imageNum}" contenteditable="false" style="display:inline-block"></div>`)
          $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum}`).after('<div><br></div>');
          $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum}`).before('<div><br></div>');

          $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum}`).draggable({
            containment: window.richTextField.document.getElementsByTagName('body'), 
            axis: "x"
          })

          // 리사이즈 기능을 위한 스타일링 적용(ifram은 css직접적으로 수정 불가)
          $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).resizable({aspectRatio: true})
          $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-handle').css({
            'position': 'absolute',
            'font-size': '0.1px',
            'display': 'block',
            '-ms-touch-action': 'none',
            'touch-action': 'none'})
          $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-e').css({
            'cursor': 'e-resize',
            'width': '7px',
            'right': '-5px',
            'top': '0',
            'height': '100%'})
          $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-s').css({
            'cursor': 's-resize',
            'height': '7px',
            'bottom': '-5px',
            'left': '0',
            'width': '100%'})
          $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-se').css({
            'cursor': 'se-resize',
            'height': '12px',
            'bottom': '1px',
            'right': '1px',
            'width': '12px'})

          $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).mouseenter(function(event) {
              event.target.style.cursor = 'pointer'
              event.target.style.border = 'solid white 3px'
              event.target.style.boxSizing = 'border-box'
          });
          $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).mouseout(function(event) {
              event.target.style.border = 'none'
          });
          
          vm.imageNum += 1
        }
        reader.readAsDataURL(file);
        this.imageFile = []
      } else if (this.imageLink != '') {
        this.execCommandWithArg('insertImage', this.imageLink)
        const vm = this
        const imgTags = $('iframe[name="richTextField"]').contents().find('img')
        imgTags.each(function (index, imgTag) {
          if (imgTag.id == '') {
            imgTag.setAttribute('id', vm.imageNum)
          }
        })
        $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).wrap(`<div id="draggableHelper${vm.imageNum}" contenteditable="false" style="display:inline-block"></div>`)
        $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum}`).after('<div><br></div>');
        $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum}`).before('<div><br></div>');

        $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum}`).draggable({
          containment: window.richTextField.document.getElementsByTagName('body'), 
          axis: "x"
        })

        // 리사이즈 기능을 위한 스타일링 적용(ifram은 css직접적으로 수정 불가)
        $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).resizable({aspectRatio: true})
        $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-handle').css({
          'position': 'absolute',
          'font-size': '0.1px',
          'display': 'block',
          '-ms-touch-action': 'none',
          'touch-action': 'none'})
        $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-e').css({
          'cursor': 'e-resize',
          'width': '7px',
          'right': '-5px',
          'top': '0',
          'height': '100%'})
        $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-s').css({
          'cursor': 's-resize',
          'height': '7px',
          'bottom': '-5px',
          'left': '0',
          'width': '100%'})
        $('iframe[name="richTextField"]').contents().find(`#draggableHelper${vm.imageNum} > .ui-wrapper`).children('.ui-resizable-se').css({
          'cursor': 'se-resize',
          'height': '12px',
          'bottom': '1px',
          'right': '1px',
          'width': '12px'})
        $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).mouseenter(function(event) {
              event.target.style.cursor = 'pointer'
              event.target.style.border = 'solid white 3px'
              event.target.style.boxSizing = 'border-box'
          });
          $('iframe[name="richTextField"]').contents().find(`#${vm.imageNum}`).mouseout(function(event) {
              event.target.style.border = 'none'
          });
        vm.imageNum += 1
        this.imageLink = ''
      }
    },
    execCmd(command) {
      window.richTextField.document.execCommand(command, false, null);
    },
    execCommandWithArg(command, arg) {
      window.richTextField.document.execCommand(command, false, arg);
    },
 
    exportToPDF() {
      html2pdf(window.richTextField.document.getElementsByTagName('body')[0], {
        margin: [22,10, 15, 10],
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
    },
    // exportToWord(){
    //     var html = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    //     var footer = "</body></html>";
    //     var content = html+ window.richTextField.document.getElementsByTagName('body')[0].innerHTML+footer;
    
    //     //link url
    //     var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        
    //     //file name
    //     var filename = 'sample_A4'+'.doc';
        
    //     // Creates the  download link element dynamically
    //     var downloadLink = document.createElement("a");
    
    //     document.body.appendChild(downloadLink);
        
    //     //Link to the file
    //     downloadLink.href = url;
            
    //     //Setting up file name
    //     downloadLink.download = filename;
            
    //     //triggering the function
    //     downloadLink.click();
    //     //Remove the a tag after donwload starts.
    //     document.body.removeChild(downloadLink);
    // }
  },
  mounted() {
    window.richTextField.document.designMode = 'On'
    window.richTextField.document.getElementsByTagName('body')[0].style.wordBreak = "break-all"
    const picker = new EmojiButton();
    const trigger = document.querySelector('#emoji-trigger');
    // document.querySelector('.emoji-picker').style.animation = 'none'

    picker.on('emoji', selection => {
      this.execCommandWithArg('insertHTML', selection.emoji);
    });

    trigger.addEventListener('click', () => picker.togglePicker(trigger));
  },
}
</script>

<style scoped>
.v-text-field__details {
  display: none !important;
}
</style>
