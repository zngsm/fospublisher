# 프로젝트 소개

## 서비스 소개

- 주제: 자서전 작성 서비스 및 오픈소스 에디터 개발
- 기획 의도
  - 자서전 작성을 통해 자신을 돌아보는 시간을 갖고, 이를 E-book화할 수 있도록 함
  - 시중에 나와있는 웹 에디터들은 E-book 작성에 적합하지 않아 맞춤형 오픈소스를 제작하고자 함




## 팀소개

|  이름  |            담당역할            |
| :----: | :----------------------------: |
| 김문정 | **팀장**, 프론트엔드, 디자이너 |
| 윤지해 |      프론트엔드, JIRA, QA      |
| 이동훈 |          백엔드, UCC           |
| 장수민 |        백엔드, IT Infra        |
| 조우리 |      프론트엔드, GIT, PPT      |



## 스택

Backend: <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=black"> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black"> <img src="https://img.shields.io/badge/Mysql-4479A1?style=flat-square&logo=Mysql&logoColor=white"> <img src="https://img.shields.io/badge/nodemon-76D04B?style=flat-square&logo=Nodemon&logoColor=black">

Frontend:<img src="https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=electron&logoColor=black"> <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white">  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white">

DevOps: <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=black">  <img src="https://img.shields.io/badge/Amazon%20AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white"> <img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=black"/> <img src="https://img.shields.io/badge/NGINX-269539?style=flat-square&logo=NGINX&logoColor=black"/>

Common: <img src="https://img.shields.io/badge/GitLab-FCA121?style=flat-square&logo=GitLab&logoColor=black"/> <img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white">



## 기능소개

- 자서전 작성 기능 및 작성에 도움을 주기 위한 오늘의 질문 기능

- 자서전 내용을 타임라인으로 제공

- 자서전 작성 완료 후 파일 추출 기능

- 에디터를 사용하여 이미지 추가 및 페이지 분절

  

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
| Frontend |        Vue.js, Electron        |
|  DevOps  | Jira,  Mattermost, Gitlab, AWS |

**버전**

- `node` : 14.16.0
- `npm` : 6.14.11



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

