const APIkey = 'FcKdtJs202110';
const username = 'parkyoungchan';

var app = new Vue({
    el: '#result',
    data: {
        list : 'nothing...'
    },
    methods: {
        updateList: async function (){

            const data = await readTodo();

            this.list = data;
        }
    }
})

//조회
async function readTodo() {

    const { data } = await axios({
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'apikey': APIkey,
        'username': username
      }
    })

    return data;
}

//생성
async function createTodo() {

    console.log('create');

    const length = (await readTodo()).length;

    const { data } = await axios({
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'apikey': APIkey,
        'username': username
      },
      data: {
        "title": "test" + (length+1),
        //지정하지 않으면 0으로 생성됨
        //"order": length+1
      }
    })

    console.log(data);
}

//수정
//임시로 가장 나중에 추가된 항목 수정

async function updateWrapper(){

    const title = document.getElementById('title').value;
    const done = (document.getElementById('done').value === "true");
    const order = parseInt(document.getElementById('order').value);

    const result = await readTodo();

    updateTodo(result[0].id,title,done,order);

}

async function updateTodo(todoID,title,done,order) {

    console.log(todoID);

    const { data } = await axios({
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/'+todoID,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'apikey': APIkey,
        'username': username,
      },
      data : {
        "title": title,
        "done": done,
        "order": order
      }
    })

    console.log(data)
}



//삭제
//임시로 queue 방식으로 항목을 삭제하게 구현

async function deleteWrapper(){
    //id 가져옴

    const result = await readTodo();
    deleteTodo(result[0].id);

}

async function deleteTodo(todoID) {

    console.log('delete');

    const { data } = await axios({
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/'+todoID,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'apikey': APIkey,
        'username': username
      }
    })

    console.log(data)
}
