<script>
//API
const APIkey = 'FcKdtJs202110';
//const username = 'parkyoungchan';
let username = '';

//drag and drop
import {
  ref
} from 'vue'

//반응형 데이터를 위해 ref사용 - items를 참조하게됨
window.items = ref([])

window.done_li = ref([])
window.undone_li = ref([])

async function reOrder(obj_list) {
  $('body').loading({
    message: 'Reordering...'
  })
  //list 따라 order값 변경

  if (obj_list == null) {
    return
  }

  //obj 리스트 처리
  const id_list = await obj_list.map(obj => obj.id);

  const {
    data
  } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder',
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'apikey': APIkey,
      'username': username
    },
    data: {
      "todoIds": id_list,
    }
  })
  $('body').loading('stop')
}

async function readTodo() {
  $('body').loading({
    message: 'Reading...'
  })

  const {
    data
  } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'apikey': APIkey,
      'username': username
    }
  })

  //items 초기화
  items.value = [];
  //items에 추가
  data.forEach(element => {
    items.value.push(element);
  });

  $('body').loading('stop')
}

async function refreshList() {
  $('body').loading({
    message: 'Refreshing...'
  })
  await readTodo();
  await reOrder(done_li);
  await reOrder(undone_li);
  await readTodo();

  $('body').loading('stop')
}

export default {
  data() {
    return {
      logged: false
    }
  },
  methods: {
    login: async function () {

      //사용자이름 가져오기
      const name = document.getElementById("name").value;
      username = name;
      await (this.logged = true);

      document.getElementById("page_title").innerHTML = username + "\'s place😎";

      await readTodo();

    },
    createTodo: async function () {
      $('body').loading({
        message: 'Creating...'
      })
      let title;
      let order;
      //사용자 입력 받기
      while (1) {
        title = prompt("할 일을 입력해주세요:", "운동하기");
        order = Number(prompt("이 할 일의 순서를 입력해주세요(숫자만 가능)", "2"));

        if (title && order) {
          break;
        } else {
          alert('Invalid Input!');
        }
      }

      const {
        data
      } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': APIkey,
          'username': username
        },
        data: {
          "title": title,
          "order": order
        }
      })

      items.value.splice(order, 0, data);

      await refreshList();

      $('body').loading('stop')

    },
    deleteTodo: async function (id) {
      $('body').loading({
        message: 'Deleting...'
      })
      const {
        data
      } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/' + id,
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'apikey': APIkey,
          'username': username
        }
      })

      //index 찾기
      const index = items.value.map(function (e) {
        return e.id;
      }).indexOf(id);
      //삭제
      items.value.splice(index, 1);

      await refreshList();

      $('body').loading('stop')
    },
    deleteAll: async function () {

      const id_list = await done_li.map(obj => obj.id);

      id_list.map(async id => {
        await this.deleteTodo(id);
      })
    },
    updateTodo: async function (item) {
      $('body').loading({
        message: 'Updating...'
      })
      //사용자 input 가져오기
      //$refs에서 가져옴
      const cur_title = this.$refs[item.id + 'title'].innerHTML;
      const cur_order = this.$refs[item.id + 'order'].innerHTML;

      //update
      const {
        data
      } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/' + item.id,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'apikey': APIkey,
          'username': username,
        },
        data: {
          "title": cur_title,
          "done": item.done,
          "order": cur_order
        }
      })

      await refreshList();
      $('body').loading('stop')
    }
  },
  setup() {

    const getDone = (done) => {

      //완료여부 기준으로 분류
      const res = items.value.filter((item) => item.done == done);

      //order 기준으로 정렬
      res.sort((a, b) => (a.order > b.order) ? 1 : -1)

      //reOrder를 위한 저장
      done ? done_li = JSON.parse(JSON.stringify(res)) : undone_li = JSON.parse(JSON.stringify(res));

      return res;
    }

    const updateDone = async function (item) {
      $('body').loading({
        message: 'Updating Done...'
      })

      const {
        data
      } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/' + item.id,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'apikey': APIkey,
          'username': username,
        },
        data: {
          "title": item.title,
          "done": item.done,
          "order": item.order
        }
      })

      await refreshList();

      $('body').loading('stop')
    }

    const startDrag = (event, item) => {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)
    }
    const onDrop = async (event, done) => {
      //onDrop시에도 getDone이 호출됨
      const itemID = event.dataTransfer.getData('itemID')
      const item = items.value.find((item) => item.id == itemID)

      if (item.done != done) {
        item.done = done;
        updateDone(item);
      }
    }

    return {
      getDone,
      onDrop,
      startDrag
    }
  }
}
</script>

<template>
  <div v-if = logged>
    <h2 id="page_title"></h2>
    <button v-on:click="createTodo" class="btn btn-1">할 일 추가하기</button>

    <h2>To Do</h2>
    <div 
    class='drop-zone'
    @drop="onDrop($event, false)"
    @dragenter.prevent
    @dragover.prevent
    >
      <div 
      v-for='item in getDone(false)' 
      :key='item.id'
      class='drag-el'
      draggable="true"
      @dragstart="startDrag($event, item)"
      >
      <h4>
        <span :ref="item.id+'order'" contenteditable="true">{{ item.order }}</span>.
        <span :ref="item.id+'title'" contenteditable="true">{{ item.title }}</span>
      </h4>
      <p>최종수정일: {{ item.updatedAt }}</p>
      <button v-on:click="deleteTodo(item.id)">삭제하기</button>
      <button v-on:click="updateTodo(item)">수정하기</button>
      </div>
    </div>

    <h2>Done</h2> <button v-on:click="deleteAll">완료된 할일 비우기</button>
    <div 
    class='drop-zone' 
    @drop="onDrop($event, true)"
    @dragenter.prevent
    @dragover.prevent
    >
      <div 
      v-for='item in getDone(true)' 
      :key='item.id'
      class='drag-el'
      draggable="true"
      @dragstart="startDrag($event, item)"
      >
      <h4>
        <span :ref="item.id+'order'" contenteditable="true">{{ item.order }}</span>
        . &emsp; 
        <span :ref="item.id+'title'" contenteditable="true">{{ item.title }}</span>
      </h4>
      <p>생성일: {{ item.createdAt }}</p>
      <p>수정일: {{ item.updatedAt }}</p>
      <button v-on:click="deleteTodo(item.id)">삭제하기</button>
      <button v-on:click="updateTodo(item)">수정하기</button>
      </div>
    </div>

  </div>
  <div v-else>
    <input type="text" id="name" value="parkyoungchan">
    <button type="button" v-on:click="login">로그인하기</button>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: gainsboro;
  padding: 10px;
  min-height: 30px;
  border-radius: 5px;
}
.drag-el {
  background-color: #9DF0FF;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}
.drag-el:nth-last-of-type(1){
  margin-bottom: 0;
}

.btn {
  border: none;
  font-family: 'Lato';
  font-size: 30px;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 25px 80px;
  display: inline-block;
  margin: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.btn:after {
  content: '';
  position: absolute;
  z-index: -1;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

/* Pseudo elements for icons */
.btn:before {
  font-family: 'FontAwesome';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  position: relative;
  -webkit-font-smoothing: antialiased;
}

/* Button 1 */
.btn-1 {
  background: #3498db;
  color: #fff;
}

.btn-1:hover {
  background: #2980b9;
}

.btn-1:active {
  background: #2980b9;
  top: 2px;
}

.btn-1:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 3;
  font-size: 140%;
  width: 60px;
}
</style>
