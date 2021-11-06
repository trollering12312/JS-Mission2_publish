# 개발 진행 과정 

## 0. 기타 세팅 

* `gitignore`

https://www.toptal.com/developers/gitignore 

* `README.md` 수정

원본 저장소 : https://github.com/KDT1-FE/JS-Mission2

* `Vue` 개발자 확장 도구 설치 

https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related?hl=ko
<br>

---

## 1. `Vue.JS` 세팅 

### 1-1. `Vue.JS` 설치 및 예제 생성 

`CLI`로 프로젝트 생성은 아직 익숙하지 않아 사용하지 않고 `CDN`으로 가져와 작업

예제 : https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance/

설치 : https://v3.vuejs.org/guide/installation.html#vue-devtools

(`@next`붙이니 작동 안함)

[다른 CDN 링크](https://vuejs.org/v2/guide/installation.html#CDN)

### 1-2. `Github Pages` 배포 확인 

일반적인 `Github` 페이지 배포 방식과 동일

[CLI 활용해 프로젝트 생성시 배포 방법](https://codingapple.com/unit/vue-build-and-deploy-with-github-pages/)

<br>

---

## 2. API 테스트 

### 2-1. Axios 활용해서 테스트해보기

[일반적인 활용](https://goddino.tistory.com/115 )

이번 과제에서는 기존 `README.md`에 나온 예시 활용해서 진행

### 2-2. 기본 요구사항 테스트


* `Vue`로 요소 content 바꾸기

https://vuejs.org/v2/guide/events.html
<br>

* `CORS` 이슈

[확장 프로그램](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) 깔아서 해결


<br>

---

## 3. UI 생성

### 3-1. Drag and Drop 예제 테스트 및 배포

참고한 [예제]( https://learnvue.co/2020/01/how-to-add-drag-and-drop-to-your-vuejs-project/)가 CLI로 `Vite`를 활용하는 방식이라 프로젝트 방식을 변경했습니다

* `Vue` 설치 : https://v3.vuejs.org/guide/installation.html

`Vetur` : VScode의 `Vue` 작성용 확장 프로그램
<br>

* `Vite` 배포용 설정

프로젝트가 `Vite` 툴을 사용하기 때문에 설정도 `vite.config.js`에서 이뤄저야함

`Vite` 정적 사이트 배포는 공식 문서를 참고함
https://vitejs.dev/guide/static-deploy.html#github-pages

(해당 저장소에서 바로 배포하기 때문에 config 파일에 `base`를 추가해줘야함)

### 3-2. API 기능과 UI 연결

이전에 구현한 API 함수를 UI에 연결해 작동을 확인합니다

주요 기능은 `App.vue`파일에 있습니다

* `ref`

`ref` : https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management

`refs` 활용 : https://stackoverflow.com/questions/49252411/vuejs-find-element-by-key/49252818

* `contentEditable`

https://stackoverflow.com/questions/6814062/using-javascript-to-change-some-text-into-an-input-field-when-clicked-on

* 전역 변수

https://stackoverflow.com/questions/54055097/use-global-variable-in-vue-template

* 주요 변수와 함수들

> **전역변수**
>
> `items` : `ref` 할일의 전체 목록이 저장되는 리스트
`done_li ,undone_li` : `setup`의 `getDone` 함수에서 변경되는 2개의 리스트로 각각 `done`을 기준으로 분류해서 할 일이 저장됨

> **함수**
> 
> [일반]
>`readTodo` : 할일 목록 전체를 가져와서 `items`를 업데이트
`reOrder` : 주어진 id리스트에 따라 할일의 `order` 다시 지정
`refreshList` : `reOrder`로 정렬한 뒤 `readTodo`를 호출해 화면을 update함
>
> [methods]
> 
`createTodo` : 사용자 입력을 받아 할 일을 생성하고 `items`를 업데이트
`deleteTodo` : 할일 id를 받아서 그 할일을 삭제
`updateTodo`: 현재 상태(변경은 변경 하고자하는 항목을 클릭하면 가능함)의 할일을 가져와 업데이트
>
> [setup]
`getDone`: `items`를 `done`기준으로 분류후 `order`기준으로 정렬함
`updateDone` : `onDrop`에서 호출되어 done의 값을 업데이트해줌
>
> 그 외의 함수들은 참고한 예제와 동일합니다


### 3-3. UI 다듬기 및 추가 기능 구현

- [x] 꾸미기

* 로그인 기능 추가

`v-if`: https://v3.ko.vuejs.org/guide/conditional.html#v-else-if

* 디자인 수정

- [x] 완료된 할 일 한번에 삭제하기

`deleteAll` 함수 추가

- [x]] 로딩 애니메이션 추가

http://carlosbonetti.github.io/jquery-loading/

가이드 따라서 `npm`, `bower`로 해봐도 안됬는데, 직접 다운받아서 사용하니 작동했다...😥

`src` 디렉토리 설정에서 실수가 많았다. 오류를 잘 보자

<br>

---

## 4. 배포 

* fork와 pr

https://chanhuiseok.github.io/posts/git-3/

* 타 저장소의 commit 내역 가져오기

https://stackoverflow.com/questions/17371150/moving-git-repository-content-to-another-repository-preserving-history

---
