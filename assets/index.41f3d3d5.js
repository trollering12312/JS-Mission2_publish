import{r as h,o as c,c as p,a,F as v,b as m,w as g,t as l,d as D,e as _}from"./vendor.0cd142a8.js";const b=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const e of n.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&i(e)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}};b();var x=(r,t)=>{for(const[s,i]of t)r[s]=i;return r};const f="FcKdtJs202110";let u="";window.items=h([]);window.done_li=h([]);window.undone_li=h([]);async function k(r){if(r==null)return;const t=await r.map(s=>s.id);console.log(t),await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder",method:"PUT",headers:{"content-type":"application/json",apikey:f,username:u},data:{todoIds:t}})}async function w(){const{data:r}=await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",method:"GET",headers:{"content-type":"application/json",apikey:f,username:u}});items.value=[],r.forEach(t=>{items.value.push(t)}),console.log("read")}async function y(){await k(done_li),await k(undone_li),await w(),console.log("refresh")}const C={data(){return{logged:!1}},methods:{login:async function(){const r=document.getElementById("name").value;console.log(r),u=r,this.logged=!0,await w()},createTodo:async function(){let r,t;for(;r=prompt("\uD560 \uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694:","\uC6B4\uB3D9\uD558\uAE30"),t=Number(prompt("\uC774 \uD560 \uC77C\uC758 \uC21C\uC11C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694(\uC22B\uC790\uB9CC \uAC00\uB2A5)","2")),!(r&&t);)alert("Invalid Input!");const{data:s}=await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",method:"POST",headers:{"content-type":"application/json",apikey:f,username:u},data:{title:r,order:t}});items.value.splice(t,0,s),await y(),console.log("create")},deleteTodo:async function(r){await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/"+r,method:"DELETE",headers:{"content-type":"application/json",apikey:f,username:u}});const t=items.value.map(function(s){return s.id}).indexOf(r);items.value.splice(t,1),await y(),console.log("delete")},updateTodo:async function(r){const t=this.$refs[r.id+"title"].innerHTML,s=this.$refs[r.id+"order"].innerHTML;await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/"+r.id,method:"PUT",headers:{"content-type":"application/json",apikey:f,username:u},data:{title:t,done:r.done,order:s}}),console.log("update"),await y()}},setup(){const r=o=>{const n=items.value.filter(e=>e.done==o);return n.sort((e,d)=>e.order>d.order?1:-1),o?done_li=JSON.parse(JSON.stringify(n)):undone_li=JSON.parse(JSON.stringify(n)),n},t=async function(o){await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/"+o.id,method:"PUT",headers:{"content-type":"application/json",apikey:f,username:u},data:{title:o.title,done:o.done,order:o.order}}),await y(),console.log("update done")};return{getDone:r,onDrop:async(o,n)=>{const e=o.dataTransfer.getData("itemID"),d=items.value.find(T=>T.id==e);d.done!=n&&(d.done=n,t(d))},startDrag:(o,n)=>{o.dataTransfer.dropEffect="move",o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("itemID",n.id)}}}},O={key:0},A=["onDragstart"],L=D(". \u2003 "),N=["onClick"],E=["onClick"],I=["onDragstart"],P=D(". \u2003 "),S=["onClick"],j=["onClick"],J={key:1},B=a("input",{type:"text",id:"name",value:"parkyoungchan"},null,-1);function F(r,t,s,i,o,n){return o.logged?(c(),p("div",O,[a("button",{onClick:t[0]||(t[0]=(...e)=>r.readTodo&&r.readTodo(...e))},"read"),a("button",{onClick:t[1]||(t[1]=(...e)=>n.createTodo&&n.createTodo(...e))},"create"),a("div",{class:"drop-zone",onDrop:t[2]||(t[2]=e=>i.onDrop(e,!0)),onDragenter:t[3]||(t[3]=g(()=>{},["prevent"])),onDragover:t[4]||(t[4]=g(()=>{},["prevent"]))},[(c(!0),p(v,null,m(i.getDone(!0),e=>(c(),p("div",{key:e.id,class:"drag-el",draggable:"true",onDragstart:d=>i.startDrag(d,e)},[a("h4",null,[a("span",{ref:e.id+"order",contenteditable:"true"},l(e.order),513),L,a("span",{ref:e.id+"title",contenteditable:"true"},l(e.title),513)]),a("p",null,"\uC0DD\uC131\uC77C: "+l(e.createdAt),1),a("p",null,"\uC218\uC815\uC77C: "+l(e.updatedAt),1),a("p",null,"done : "+l(e.done),1),a("button",{onClick:d=>n.deleteTodo(e.id)},"\uC0AD\uC81C\uD558\uAE30",8,N),a("button",{onClick:d=>n.updateTodo(e)},"\uC218\uC815\uD558\uAE30",8,E)],40,A))),128))],32),a("div",{class:"drop-zone",onDrop:t[5]||(t[5]=e=>i.onDrop(e,!1)),onDragenter:t[6]||(t[6]=g(()=>{},["prevent"])),onDragover:t[7]||(t[7]=g(()=>{},["prevent"]))},[(c(!0),p(v,null,m(i.getDone(!1),e=>(c(),p("div",{key:e.id,class:"drag-el",draggable:"true",onDragstart:d=>i.startDrag(d,e)},[a("h4",null,[a("span",{ref:e.id+"order",contenteditable:"true"},l(e.order),513),P,a("span",{ref:e.id+"title",contenteditable:"true"},l(e.title),513)]),a("p",null,"\uC0DD\uC131\uC77C: "+l(e.createdAt),1),a("p",null,"\uC218\uC815\uC77C: "+l(e.updatedAt),1),a("p",null,"done : "+l(e.done),1),a("button",{onClick:d=>n.deleteTodo(e.id)},"\uC0AD\uC81C\uD558\uAE30",8,S),a("button",{onClick:d=>n.updateTodo(e)},"\uC218\uC815\uD558\uAE30",8,j)],40,I))),128))],32)])):(c(),p("div",J,[B,a("button",{type:"button",onClick:t[8]||(t[8]=(...e)=>n.login&&n.login(...e))},"\uB85C\uADF8\uC778\uD558\uAE30")]))}var M=x(C,[["render",F]]);const U=_(M);U.mount("#app");
