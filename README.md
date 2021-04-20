# 프로젝트 소개

## 서비스 소개

- 주제: 자서전 작성 서비스

- 기획 의도: 자서전 작성을 통해 자신을 돌아보는 시간을 갖고, 이를 E-book화할 수 있도록 함

  

## 팀소개

|  이름  |       담당역할       |
| :----: | :------------------: |
| 김문정 | 프론트엔드, 디자이너 |
| 윤지해 | 프론트엔드, JIRA, QA |
| 이동훈 |     백엔드, UCC      |
| 장수민 |   백엔드, IT Infra   |
| 조우리 |   프론트엔드, GIT    |



## 기능소개

- 자서전 작성 기능 및 작성에 도움을 주기 위한 오늘의 질문 기능
- 자서전 내용을 타임라인으로 제공
- 자서전 작성 완료 후 공유 기능
- 자서전 작성 완료 후 파일 추출 기능
- 유저 간 쪽지 주고받기 기능
- 공유된 자서전에 대한 좋아요 기능



## 프로젝트 실행 방법

### Backend

```text
$ git clone https://lab.ssafy.com/s04-final/s04p31b201.git
...
```

### Frontend

```text
$ git clone https://lab.ssafy.com/s04-final/s04p31b201.git
...
```



## 기술 스택

|   분류   |              기술              |
| :------: | :----------------------------: |
| Backend  |       Node.js, Electron        |
| Frontend |             Vue.js             |
|  DevOps  | Jira,  Mattermost, Gitlab, AWS |



## 개발 규칙

### GIT Convention

>자세한 내용은 다음 페이지를 참고한다.
>
>[GIT Convention](https://www.notion.so/GIT-Convention-e0a324b35a154a0ebdc8e9600b46fe41)

```bash
###커밋메세지 규칙###

ex. [feat] : 제목 
#   feat       : 새로운 기능 추가
#   fix        : 버그 수정
#   refactor   : 코드 리팩토링
#   style      : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
#   docs       : 문서 수정
#   test       : 테스트 코드, 리팩토링 테스트 코드 추가
#   chore      : 빌드 업무 수정, 패키지 매니저 수정

###브랜치명 예시###

ex. 로그인 개발용 프론트엔드 feature branch
	: feature/fe_login
```





### Code Convention

>자세한 내용은 다음 페이지를 참고한다.
>
>[Code Convention](https://www.notion.so/Code-Convention-ab35a4d0f439492589749090d4b68ec9)

- Vue.js: [Vue.js 공식 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html)

- JavaScript

  - function: camel_case 

  - class: pascal_case 

  - indentation : 2spaces 

  - 문장 끝 세미콜론(;) 

  - 함수는 화살표 함수

    ```
    const app = () => {}
    ```

  - const / let 쓰기 (var 금지) 

  - 함수간 공백 1칸씩 

  - 주석 최소화 

  - 네이밍 규칙  

    - 명령문 형태, 동사+목적어+목적보어  (ex. createUserForBook)  
    - 동사는 CRUD 를 준수 (create, read, update, delete) 
    - 연산자는 다 띄움, 괄호 안은 `,` 의 경우에만 공백 허용, 그 외엔 붙여쓰기

