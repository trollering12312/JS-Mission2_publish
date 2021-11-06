# 📌 할 일 관리(Todo) 프로젝트

API 사용에 대해 궁금한 점은 슬랙 '질의응답' 채널에 질문 남겨주세요!

- 과제 기간: 10월 31일(일) ~ 11월 5일(금)
- 리뷰 기간: 11월 5일(금) ~ 11월 10일(수)

## 요구사항

### 필수 요구사항

- [x] 할 일 목록을 조회(Read)할 수 있어야 합니다.(3점)
- [x] 할 일 항목을 추가(Create)할 수 있어야 합니다.(3점)
- [x] 할 일 항목을 수정(Update)할 수 있어야 합니다.(3점)
- [x] 할 일 항목을 삭제(Delete)할 할 수 있어야 합니다.(3점)
- [x] VueJS를 활용해 만들어야 합니다.(3점)
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.(3점)

### 선택 요구사항

- [x] 할 일 항목의 순서를 바꿀 수 있도록 만들어 보세요.(3점)
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해 보세요.(2점)
- [x] 할 일을 완료한 항목을 한번에 삭제할 수 있도록 만들어 보세요.(2점)
- [x] 할 일 항목의 최신 수정일을 표시해 보세요.(1점)
- [x] 최초 API 요청(Request)에 대한 로딩 애니메이션을 추가해 보세요.(2점)
- [x] SCSS, Bootstrap 등을 구성해 프로젝트를 최대한 예쁘게(?) 만들어 보세요.(2점) - 나름...?

## API 사용법

- 요청 주소(Endpoint): `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`

모든 API 요청(Request) `headers`에 다음 정보가 꼭 포함되어야 합니다.<br>
`username`은 다른 사람과 겹치지 않도록 주의하세요!<br>
본명으로 만들면 나중에 문제가 발생했을 때 찾기가 쉬워요.(E.g. `ParkYoungWoong`)

```json
{
  "content-type": "application/json",
  "apikey": "FcKdtJs202110",
  "username": "<YOUR_NAME>"
}
```

API 사용 예시:

```js
async function createTodo() {
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'ParkYoungWoong'
    },
    data: {
      "title": "할 일 관리 프로젝트 과제 PR 생성"
    }
  })
  console.log(data)
}
```

### 목록 조회

전체 할 일 목록을 조회합니다.

```curl
curl -X 'GET' \ 
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
```

```plaintext
@return {Object[]} - 조회된 나의 할 일 목록
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
[
  {
    "id": "mnIwaAPIAE1ayQmqekiR",
    "order": 0,
    "title": "JS 공부하기",
    "done": false,
    "createdAt": "2021-10-28T05:18:51.868Z",
    "updatedAt": "2021-10-28T05:18:51.868Z"
  },
  {
    "id": "tMzPImGoWtRdJ6yyVv2y",
    "order": 1,
    "title": "과제 PullRequest(PR) 생성",
    "done": true,
    "createdAt": "2021-10-28T04:16:53.980Z",
    "updatedAt": "2021-10-28T09:40:17.955Z"
  },
  {
    "id": "Rq8BebKihCgteHHhMIRS",
    "order": 2,
    "title": "API 스터디",
    "done": false,
    "createdAt": "2021-10-28T04:17:02.510Z",
    "updatedAt": "2021-10-28T04:17:02.510Z"
  }
]
```

### 목록 순서 변경

할 일 목록의 순서를 변경합니다.

```curl
curl -X 'PUT' \ 
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder
```

```plaintext
@param {String[]} todoIds - 변경할 순서의 할 일 항목의 ID 배열 (필수)
@return {Boolean} - 순서 변경 여부
```

요청 데이터 예시:

```json
{
  "todoIds": [
    "mnIwaAPIAE1ayQmqekiR",
    "tMzPImGoWtRdJ6yyVv2y",
    "GHrvr3LaPx1g7y2sNuaC",
    "Rq8BebKihCgteHHhMIRS"
  ]
}
```

응답 데이터 예시:

```json
true
```

### 항목 추가

할 일 항목을 새롭게 추가합니다.

```curl
curl -X 'POST' \ 
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
```

```plaintext
@param {String} title - 할 일의 제목 (필수)
@param {Number} order - 할 일의 순서
@return {Object} - 생성된 할 일 항목 객체 
```

요청 데이터 예시:

```json
{
  "title": "KDT 과정 설계 미팅",
  "order": 2
}
```

응답 데이터 예시:

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "order": 0,
  "title": "KDT 과정 설계 미팅",
  "done": false,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 수정

특정 할 일 항목을 수정합니다.

```curl
curl -X 'PUT' \ 
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
```

```plaintext
@param {String} title - 할 일의 제목 (필수)
@param {Boolean} done - 할 일의 완료 여부 (필수)
@param {Number} order - 할 일의 순서 (필수)
@return {Object} - 수정된 할 일 항목 객체  
```

요청 데이터 예시:

```json
{
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2
}
```

응답 데이터 예시:

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 삭제

특정 할 일 항목을 삭제합니다.

```curl
curl -X 'DELETE' \ 
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
```

```plaintext
@return {Boolean} - 할 일 항목의 삭제 여부  
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
true
```
