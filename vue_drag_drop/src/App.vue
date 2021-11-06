<script>
//API
const APIkey = 'FcKdtJs202110';
//const username = 'parkyoungchan';
let username = '';

//drag and drop
import {ref} from 'vue'

//반응형 데이터를 위해 ref사용 - items를 참조하게됨
window.items = ref([
])

window.done_li = ref([])
window.undone_li = ref([])

async function reOrder(obj_list) {
  //list 따라 order값 변경

  if (obj_list == null) {
    return
  }

  //obj 리스트 처리
  const id_list = await obj_list.map(obj => obj.id);
  console.log(id_list);

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
}

async function readTodo() {
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

  console.log("read");
}

async function refreshList(){
  await reOrder(done_li);
  await reOrder(undone_li);

  await readTodo();

  console.log("refresh");
}

export default{
  data () {
    return{
      logged : false
    }
  },
  methods: {
    login : async function(){

      //사용자이름 가져오기
      const name = document.getElementById("name").value;
      console.log(name);
      username = name;

      this.logged = true;

      await readTodo();
    },
    createTodo : async function(){
      let title;
      let order;
      //사용자 입력 받기
      while(1){
        title = prompt("할 일을 입력해주세요:", "운동하기");
        order = Number(prompt("이 할 일의 순서를 입력해주세요(숫자만 가능)", "2"));

        if (title && order) {
          break;
        } else {
          alert('Invalid Input!');
        }
      }

      const { data } = await axios({
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'apikey': APIkey,
        'username': username
      },
      data: {
        "title": title,
        "order" : order
      }
    })

    items.value.splice(order, 0, data);
    
    await refreshList();

    console.log("create");

    },
    deleteTodo: async function(id){
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
      const index = items.value.map(function(e){return e.id;}).indexOf(id);
      //삭제
      items.value.splice(index,1);

      await refreshList();
      
      console.log("delete");

    },
    updateTodo : async function(item){
      //사용자 input 가져오기
      //$refs에서 가져옴
      const cur_title = this.$refs[item.id+'title'].innerHTML;
      const cur_order = this.$refs[item.id+'order'].innerHTML;

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
      
      console.log("update");
      await refreshList();
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
        
        console.log("update done");
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

      return{
          getDone,
          onDrop,
          startDrag
      }
  }
}

</script>

<template>
  <div v-if = logged>
    <button v-on:click="readTodo">read</button>
    <button v-on:click="createTodo">create</button>
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
      <h4><span :ref="item.id+'order'" contenteditable="true">{{ item.order }}</span>. &emsp; <span :ref="item.id+'title'" contenteditable="true">{{ item.title }}</span></h4>
      <p>생성일: {{ item.createdAt }}</p>
      <p>수정일: {{ item.updatedAt }}</p>
      <p>done : {{ item.done }}</p>
      <button v-on:click="deleteTodo(item.id)">삭제하기</button>
      <button v-on:click="updateTodo(item)">수정하기</button>
      </div>
    </div>

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
      <h4><span :ref="item.id+'order'" contenteditable="true">{{ item.order }}</span>. &emsp; <span :ref="item.id+'title'" contenteditable="true">{{ item.title }}</span></h4>
      <p>생성일: {{ item.createdAt }}</p>
      <p>수정일: {{ item.updatedAt }}</p>
      <p>done : {{ item.done }}</p>
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
}
.drag-el {
  background-color: aqua;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}
.drag-el:nth-last-of-type(1){
  margin-bottom: 0;
}
</style>
