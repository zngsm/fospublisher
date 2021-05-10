<template>
  <body :style="styleObject.editorWidth" class="editorWidth">
    <div class=".toolBar">
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('bold')"
      >
        <i class="fas fa-bold"></i>
        <span :style="styleObject.tooltip" class="tooltip">굵게</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('italic')"
      >
        <i class="fas fa-italic"></i>
        <span :style="styleObject.tooltip" class="tooltip">기울임꼴</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('underline')"
      >
        <i class="fas fa-underline"></i>
        <span :style="styleObject.tooltip" class="tooltip">밑줄</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('strikethrough')"
      >
        <i class="fas fa-strikethrough"></i>
        <span :style="styleObject.tooltip" class="tooltip">취소선</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('justifyLeft')"
      >
        <i class="fas fa-align-left"></i>
        <span :style="styleObject.tooltip" class="tooltip">왼쪽 정렬</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('justifyCenter')"
      >
        <i class="fas fa-align-center"></i>
        <span :style="styleObject.tooltip" class="tooltip">가운데 정렬</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('justifyRight')"
      >
        <i class="fas fa-align-right"></i>
        <span :style="styleObject.tooltip" class="tooltip">오른쪽 정렬</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('justifyFull')"
      >
        <i class="fas fa-align-justify"></i>
        <span :style="styleObject.tooltip" class="tooltip">양쪽 맞춤</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('cut')"
      >
        <i class="fas fa-cut"></i>
        <span :style="styleObject.tooltip" class="tooltip">잘라내기</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('copy')"
      >
        <i class="fas fa-copy"></i>
        <span :style="styleObject.tooltip" class="tooltip">복사하기</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('indent')"
      >
        <i class="fas fa-indent"></i>
        <span :style="styleObject.tooltip" class="tooltip">들여쓰기</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('outdent')"
      >
        <i class="fas fa-outdent"></i>
        <span :style="styleObject.tooltip" class="tooltip">내어쓰기</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('subscript')"
      >
        <i class="fas fa-subscript"></i>
        <span :style="styleObject.tooltip" class="tooltip">아래 첨자</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('superscript')"
      >
        <i class="fas fa-superscript"></i>
        <span :style="styleObject.tooltip" class="tooltip">위 첨자</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('undo')"
      >
        <i class="fas fa-undo"></i>
        <span :style="styleObject.tooltip" class="tooltip">취소</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('redo')"
      >
        <i class="fas fa-redo"></i>
        <span :style="styleObject.tooltip" class="tooltip">다시 실행</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('insertUnorderedList')"
      >
        <i class="fas fa-list-ul"></i>
        <span :style="styleObject.tooltip" class="tooltip">글머리 기호</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('insertOrderedList')"
      >
        <i class="fas fa-list-ol"></i>
        <span :style="styleObject.tooltip" class="tooltip">번호 매기기</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('insertParagraph')"
      >
        <i class="fas fa-paragraph"></i>
        <span :style="styleObject.tooltip" class="tooltip">줄바꿈</span>
      </button>
      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="execCmd('insertHorizontalRule')"
      >
        HR
        <span :style="styleObject.tooltip" class="tooltip">가로선</span>
      </button>

      <button
        :style="styleObject.toolButton"
        class="toolButton"
        @click="toggleLinkModal"
      >
        <i class="fas fa-link"></i>
        <span :style="styleObject.tooltip" class="tooltip">링크</span>
      </button>

      <div id="linkModal" class="modal">
        <div :style="styleObject.modalContent" class="modal-content">
          <h2 style="margin-top: 0">Link</h2>
          <input
            :style="styleObject.modalTextInput"
            v-model="pageLink"
            class="modalTextInput"
            type="text"
          />
          <button
            :style="styleObject.modalButton"
            class="modalButton"
            @click="toggleLinkModal"
          >
            OKAY
          </button>
        </div>
      </div>

      <button
        :style="styleObject.toolButton"
        id="emoji-trigger"
        class="toolButton"
      >
        😀
        <span :style="styleObject.tooltip" class="tooltip">이모티콘</span>
      </button>
      <div class="dropdown">
        <button
          @click="toggleDropdown('fontStyleDropdown')"
          class="dropdownButton"
          :style="styleObject.dropdownButton"
        >
          FONT STYLE ▾
          <span :style="styleObject.tooltip" class="tooltip">글꼴</span>
        </button>
        <div
          id="fontStyleDropdown"
          style="width: 110px"
          class="dropdown-content"
        >
          <div
            v-for="(font, index) in fontStyle"
            :key="index"
            :style="{ 'font-family': [font] }"
            @click="
              [
                execCommandWithArg('fontName', font),
                toggleDropdown('fontStyleDropdown'),
              ]
            "
          >
            {{ font }}
          </div>
        </div>
      </div>
      <div class="dropdown">
        <button
          @click="toggleDropdown('fontSizeDropdown')"
          class="dropdownButton"
          :style="styleObject.dropdownButton"
        >
          FONT SIZE ▾
          <span :style="styleObject.tooltip" class="tooltip">글씨 크기</span>
        </button>
        <div id="fontSizeDropdown" style="width: 97px" class="dropdown-content">
          <div
            v-for="(size, index) in fontSize"
            :key="index"
            @click="
              [
                execCommandWithArg('formatBlock', size),
                toggleDropdown('fontSizeDropdown'),
              ]
            "
          >
            {{ size }}
          </div>
        </div>
      </div>
      <div style="display: inline-block;">
        <div :style="styleObject.colorPickerButton" class="colorPickerButton">FONT COLOR</div>
        <button :style="styleObject.toolButtonText" class="toolButtonText">
          <input
            class="colorPicker"
            type="color"
            @change="execCommandWithArg('foreColor', $event.target.value)"
          />
          <span :style="styleObject.tooltip" class="tooltip">글씨 색</span>
        </button>
      </div>
      <div style="display: inline-block;">
        <div :style="styleObject.colorPickerButton" class="colorPickerButton">BACKGROUND COLOR</div>
        <button :style="styleObject.toolButtonText" class="toolButtonText">
          <input
            class="colorPicker"
            type="color"
            @change="execCommandWithArg('hiliteColor', $event.target.value)"
          />
          <span :style="styleObject.tooltip" class="tooltip">글꼴 배경색</span>
        </button>
      </div>

      <button
        :style="styleObject.toolButtonText"
        class="toolButtonText"
        @click="toggleImageModal"
      >
        <i class="fas fa-file-image"></i> IMAGE
        <span :style="styleObject.tooltip" class="tooltip">이미지 삽입</span>
      </button>

      <div id="imageModal" class="modal">
        <div :style="styleObject.modalContent" class="modal-content">
          <h2 style="margin-top: 0">Image upload</h2>
          <input
            :style="styleObject.modalTextInput"
            class="modalTextInput"
            id="ImageFile"
            type="file"
            accept="image/png, image/jpeg"
          />
          <div style="font-size: 15px; padding-bottom: 5px">Image link</div>
          <input
            :style="styleObject.modalTextInput"
            v-model="imageLink"
            class="modalTextInput"
            type="text"
          />
          <button
            :style="styleObject.modalButton"
            class="modalButton"
            @click="toggleImageModal"
          >
            OKAY
          </button>
        </div>
      </div>

      <button
        :style="styleObject.toolButtonText"
        class="toolButtonText"
        @click="execCmd('selectAll')"
      >
        SELECT ALL
        <span :style="styleObject.tooltip" class="tooltip">전부 선택</span>
      </button>
      <button
        :style="styleObject.toolButtonText"
        class="toolButtonText"
        @click="exportToPDF()"
      >
        <i class="fas fa-file-pdf"></i> PDF
        <span :style="styleObject.tooltip" class="tooltip">PDF 추출</span>
      </button>
    </div>

    <iframe
      :style="styleObject.editorWidth"
      id="richTextField"
      name="richTextField"
      class="editorWidth"
    ></iframe>
  </body>
</template>

<script>
import { EmojiButton } from "@joeattardi/emoji-button";
import html2pdf from "html2pdf.js";
import jquery from "jquery";
import "@fortawesome/fontawesome-free/js/all.js";

require( "jquery-ui/ui/widgets/draggable" );
require("jquery");
require("jquery-ui-bundle");

export default {
  props: {
    styleObject: Object,
    content: String,
  },
  data() {
    return {
      isInEditMode: true,
      fontSize: ["H1", "H2", "H3", "H4", "H5", "H6"],
      fontStyle: ["돋움", "굴림", "바탕", "궁서", "맑은 고딕"],
      // fontStyle: ['Arial', 'Comic Sans MS', 'Courier', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana'],
      imageFile: [],
      imageLink: "",
      imageNum: 0,
      pageLink: "",
      pagination: 1,
    };
  },
  methods: {
    // JH
    // 명령 삽입 후 자동으로 다음 커서로 이동
    setFocus() {
      const iFrame = document.getElementsByName("richTextField");
      jquery(iFrame).contents().find("body").focus();
    },
    toggleImageModal() {
      const modal = document.getElementById("imageModal");
      if (modal.style.display == "block") {
        modal.style.display = "none";
        const imageFile = document.getElementById("ImageFile").value;
        if (this.imageLink != "" || imageFile) {
          this.insertImage();
        }
      } else {
        modal.style.display = "block";
      }
    },
    toggleLinkModal() {
      const modal = document.getElementById("linkModal");
      if (modal.style.display == "block") {
        modal.style.display = "none";
        if (this.pageLink != "") {
          this.insertLink();
        }
      } else {
        modal.style.display = "block";
      }
    },
    toggleDropdown(arg) {
      document.getElementById(arg).classList.toggle("show");
    },
    pageBreak() {
      // 에디터 안에 들어있는 태그 모두 가져오기
      const childNodes = jquery('iframe[name="richTextField"]')
        .contents()
        .find("body")[0].childNodes;
      const vm = this;
      childNodes.forEach(function (childNode) {
        // 각 태그의 y축 시작 위치는 childNode.offsetTop
        // pagination 1부터 시작, 500px마다 페이지 분절하는 것으로 설정
        if (childNode.offsetTop > vm.pagination * 500) {
          // class="html2pdf__page-break" <-- htmlpdf 모듈에서 페이지 분절 기능을 담당하는 class
          // 500px마다 해당 class를 담은 div를 삽입한다
          jquery(`<br>
            <div class="html2pdf__page-break" style="border-bottom: 1px dashed black; position: relative;">
              <div style="-webkit-transform: translate(-50%,-50%); 
                transform: translate(-50%,-50%);
                position: absolute; 
                background-color: white;
                border: 1px solid black;
                border-radius: 3px;
                top: 50%;  
                left: 50%;
                padding: 2px 10px;
                justify-content: center;"
              >
                PAGE ${vm.pagination}
              </div>
            </div>
            <br>`).insertBefore(childNode);
          vm.pagination += 1;
        }
      });
    },
    // 이미지 삽입 후 드래그 및 리사이즈 기능 추가 함수
    imageDragResize() {
      const vm = this;
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#${vm.imageNum}`)
        .wrap(
          `<div id="draggableHelper${vm.imageNum}" contenteditable="false" style="display:inline-block"></div>`
        );
      // 이미지 위 아래로 빈 칸 추가
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#draggableHelper${vm.imageNum}`)
        .after("<br>");
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#draggableHelper${vm.imageNum}`)
        .before("<br>");

      // x축 방향으로만 이미지 드래그 가능, richtextField 내에서만 움직일 수 있음
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#draggableHelper${vm.imageNum}`)
        .draggable({
          containment: window.richTextField.document.getElementsByTagName(
            "body"
          ),
          scroll: true,
          scrollSensitivity: 100,
          scrollSpeed: 100,
          // x축 y축 둘 다 가능(axis 속성 제외)
          // axis: "x",
        });

      // 리사이즈 기능을 위한 스타일링 적용(ifram 내부 객체는 style 태그 안에서 css직접적으로 수정 불가)
      // 리사이즈 핸들러 css
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#${vm.imageNum}`)
        .resizable({ aspectRatio: true, minWidth: 300 });
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#draggableHelper${vm.imageNum} > .ui-wrapper`)
        .children(".ui-resizable-handle")
        .css({
          position: "absolute",
          "font-size": "0.1px",
          display: "block",
          "-ms-touch-action": "none",
          "touch-action": "none",
        });
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#draggableHelper${vm.imageNum} > .ui-wrapper`)
        .children(".ui-resizable-e")
        .css({
          cursor: "e-resize",
          width: "7px",
          right: "-5px",
          top: "0",
          height: "100%",
        });
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#draggableHelper${vm.imageNum} > .ui-wrapper`)
        .children(".ui-resizable-s")
        .css({
          cursor: "s-resize",
          height: "7px",
          bottom: "-5px",
          left: "0",
          width: "100%",
        });
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#draggableHelper${vm.imageNum} > .ui-wrapper`)
        .children(".ui-resizable-se")
        .css({
          cursor: "se-resize",
          height: "12px",
          bottom: "1px",
          right: "1px",
          width: "12px",
        });
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#${vm.imageNum}`)
        .mouseenter(function (event) {
          event.target.style.cursor = "pointer";
          event.target.style.border = "solid grey 1px";
          event.target.style.boxSizing = "border-box";
        });
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(`#${vm.imageNum}`)
        .mouseout(function (event) {
          event.target.style.border = "none";
        });
      vm.imageNum += 1;
    },
    insertLink() {
      this.execCommandWithArg("createLink", this.pageLink);
      const links = window.richTextField.document.querySelectorAll("a");
      links.forEach((item) => {
        item.target = "_blank";
        // 링크 삽입 후 클릭하면 링크로 이동할 수 있도록 디자인 모드 끔
        item.addEventListener("mouseover", () => {
          window.richTextField.document.designMode = "Off";
        });
        // 링크 삽입 후 다른 작업이 가능하도록 디자인 모드 다시 킴
        item.addEventListener("mouseout", () => {
          window.richTextField.document.designMode = "On";
        });
      });
      this.pageLink = "";
    },
    insertImage() {
      const imageFile = document.getElementById("ImageFile").files[0];
      // 로컬에서 이미지를 직접 올리는 경우
      this.setFocus();
      if (imageFile) {
        const vm = this;
        const file = imageFile;
        const reader = new FileReader();
        const image = new Image();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          image.src = reader.result;
        };
        setTimeout(() => {
          this.execCommandWithArg("insertImage", image.src);
        }, 100);
        setTimeout(() => {
          const imgTags = $('iframe[name="richTextField"]')
            .contents()
            .find("img");
          imgTags.each(function (index, imgTag) {
            if (imgTag.id == "") {
              imgTag.setAttribute("id", vm.imageNum);
              imgTag.style.maxWidth = 700;
              imgTag.onload = function () {
                vm.imageDragResize();
              };
              document.getElementById("ImageFile").value = "";
            }
          });
        }, 100);

        // 이미지 링크로 올리는 경우
      } else if (this.imageLink != "") {
        this.execCommandWithArg("insertImage", this.imageLink);
        const vm = this;
        const imgTags = jquery('iframe[name="richTextField"]')
          .contents()
          .find("img");
        imgTags.each(function (index, imgTag) {
          if (imgTag.id == "") {
            imgTag.setAttribute("id", vm.imageNum);
            imgTag.style.maxWidth = 700;
            imgTag.onload = function () {
              vm.imageDragResize();
            };
          }
        });
        this.imageLink = "";
      }
    },
    execCmd(command) {
      // 인자가 필요없는 명령어인 경우
      // ex. 글씨 굵게 하기, 가로선 넣기 등
      window.richTextField.document.execCommand(command, false, null);
      this.setFocus();
    },
    execCommandWithArg(command, arg) {
      // 인자가 필요한 명령어인 경우
      // ex. 이미지 삽입시 링크
      window.richTextField.document.execCommand(command, false, arg);
      setTimeout(() => {
        this.setFocus();
      }, 10);
    },

    async exportToPDF() {
      let today = new Date();   
      let year = today.getFullYear(); 
      let month = today.getMonth() + 1;  
      let date = today.getDate(); 
      // 페이지가 캡쳐되기 전에 페이지 분절에 사용된 div를 잠시 숨김 처리
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(".html2pdf__page-break")
        .css("visibility", "hidden");
      // html2pdf npm 모듈 사용, 에디터 내용을 캡쳐하여 이를 pdf로 변환하는 방식
      await html2pdf(
        window.richTextField.document.getElementsByTagName("body")[0],
        {
          margin: 10,
          filename: `${year}_${month}_${date}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            // logging: true,
            // dpi: 192,
            // letterRendering: false,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            precision: 30,
          },
        }
      );

      // pdf 생성이 완료되면 페이지 분절 표기가 다시 보이도록 설정
      jquery('iframe[name="richTextField"]')
        .contents()
        .find(".html2pdf__page-break")
        .css("visibility", "visible");
    },
  },
  mounted() {
    // richTextField의 내용을 수정할 수 있도록 디자인 모드를 켜줌
    window.richTextField.document.designMode = "On";

    // 문자가 richTextField의 너비를 넘어섰을 때 자동으로 줄바꿈
    window.richTextField.document.getElementsByTagName(
      "body"
    )[0].style.wordBreak = "break-all";
    window.richTextField.document.getElementsByTagName("body")[0].style.margin =
      "10px";
    // window.richTextField.document.getElementsByTagName('body')[0].style.pageBreakBefore = "auto"

    // 이모티콘 선택하면 커서 위치에 삽입할 수 있도록 하는 코드
    const picker = new EmojiButton();
    const trigger = document.querySelector("#emoji-trigger");
    picker.on("emoji", (selection) => {
      this.execCommandWithArg("insertHTML", selection.emoji);
    });

    trigger.addEventListener("click", () => picker.togglePicker(trigger));

    // 스크롤 발생 감지해서 pageBreak 함수로 연결
    var vm = this;
    jquery('iframe[name="richTextField"]')
      .contents()
      .scroll(function () {
        vm.pageBreak();
      });

    // 드롭다운이 열려있거나 모달이 열려있는데 다른 곳을 클릭하면 자동으로 닫히도록 설정
    window.onclick = function (event) {
      if (!event.target.matches(".dropdownButton")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
      if (event.target == document.getElementById("linkModal")) {
        document.getElementById("linkModal").style.display = "none";
        vm.pageLink = "";
      }
      if (event.target == document.getElementById("imageModal")) {
        document.getElementById("imageModal").style.display = "none";
        vm.imageLink = "";
      }
    };

    window.richTextField.document.onclick = function (event) {
      if (!event.target.matches(".dropdownButton")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };

    // 에디터 내용이 변경될때 emit으로 전달
    jquery('iframe[name="richTextField"]').contents().on('DOMSubtreeModified propertychange', function() {
      const content = window.richTextField.document.getElementsByTagName("body")[0].outerHTML.substring(51).slice(0,-7)
      vm.$emit("updateContent", content)
    });

    // content 불러오는 경우 에디터에 채워넣기
    window.richTextField.document.getElementsByTagName("body")[0].innerHTML = this.content
  },
};
</script>

<style scoped>
.v-text-field__details {
  display: none !important;
}
.toolBar {
  display: flex;
}
.toolButton {
  margin-right: 2px;
  cursor: pointer;
  background-color: white;
  border: none;
  color: black;
  width: 40px;
  height: 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  position: relative;
}
.toolButtonText {
  cursor: pointer;
  background-color: white;
  border: none;
  color: black;
  height: 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  position: relative;
}
.toolButton:hover {
  background-color: #efefef;
}
.toolButton:hover .tooltip {
  visibility: visible;
}
.tooltip {
  font-size: 13px;
  visibility: hidden;
  width: 70px;
  display: inline;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 5px 8px 5px;
  border-radius: 6px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  opacity: 0.8;
  top: 100%;
  left: 50%;
  margin-left: -40px;
}
.tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%; /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.toolButtonText:hover {
  background-color: #efefef;
}
.toolButtonText:hover .tooltip {
  visibility: visible;
}
.toolButtonText .tooltip {
  font-size: 13px;
  visibility: hidden;
  width: 70px;
  display: inline;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 5px 8px 5px;
  border-radius: 6px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  top: 100%;
  opacity: 0.8;
  left: 50%;
  margin-left: -40px;
}
.toolButtonText .tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%; /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}
.colorPicker {
  cursor: pointer;
  border: none;
}
.colorPickerButton {
  font-size: 14px;
  display: inline-block;
  padding: 0px 5px;
  color: gray;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.dropdownButton {
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
}
.dropdownButton:hover .tooltip {
  visibility: visible;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content div {
  cursor: pointer;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content :hover {
  background-color: #f1f1f1;
}
.show {
  display: block;
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 400px;
  border-radius: 10px;
}
.modalButton {
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  padding: 7px;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 0.5px #dadce0;
  background-color: #ececec;
}
.modalButton:hover {
  background-color: #dddddd;
}
.modalTextInput {
  width: 99%;
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 17px;
}
#richTextField {
  overflow-y: hidden;
  height: 500px;
  border: solid #d1d1d1 1px;
  border-radius: 3px;
}
.editorWidth {
  width: 737px;
}
</style>
