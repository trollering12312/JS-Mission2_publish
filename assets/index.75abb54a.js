import{r as h,o as c,c as p,a as r,F as v,b,w as g,d as m,t as u,e as k}from"./vendor.0cd142a8.js";const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const t of o.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&d(t)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}};T();var x=(a,e)=>{for(const[s,d]of e)a[s]=d;return a};const f="FcKdtJs202110";let l="";window.items=h([]);window.done_li=h([]);window.undone_li=h([]);async function D(a){if($("body").loading({message:"Reordering..."}),a==null)return;const e=await a.map(s=>s.id);await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder",method:"PUT",headers:{"content-type":"application/json",apikey:f,username:l},data:{todoIds:e}}),$("body").loading("stop")}async function _(){$("body").loading({message:"Reading..."});const{data:a}=await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",method:"GET",headers:{"content-type":"application/json",apikey:f,username:l}});items.value=[],a.forEach(e=>{items.value.push(e)}),$("body").loading("stop")}async function y(){$("body").loading({message:"Refreshing..."}),await _(),await D(done_li),await D(undone_li),await _(),$("body").loading("stop")}const A={data(){return{logged:!1}},methods:{login:async function(){l=document.getElementById("name").value,await(this.logged=!0),document.getElementById("page_title").innerHTML=l+"'s place\u{1F60E}",await _()},createTodo:async function(){$("body").loading({message:"Creating..."});let a,e;for(;a=prompt("\uD560 \uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694:","\uC6B4\uB3D9\uD558\uAE30"),e=Number(prompt("\uC774 \uD560 \uC77C\uC758 \uC21C\uC11C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694(\uC22B\uC790\uB9CC \uAC00\uB2A5)","2")),!(a&&e);)alert("Invalid Input!");const{data:s}=await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",method:"POST",headers:{"content-type":"application/json",apikey:f,username:l},data:{title:a,order:e}});items.value.splice(e,0,s),await y(),$("body").loading("stop")},deleteTodo:async function(a){$("body").loading({message:"Deleting..."}),await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/"+a,method:"DELETE",headers:{"content-type":"application/json",apikey:f,username:l}});const e=items.value.map(function(s){return s.id}).indexOf(a);items.value.splice(e,1),await y(),$("body").loading("stop")},deleteAll:async function(){(await done_li.map(e=>e.id)).map(async e=>{await this.deleteTodo(e)})},updateTodo:async function(a){$("body").loading({message:"Updating..."});const e=this.$refs[a.id+"title"].innerHTML,s=this.$refs[a.id+"order"].innerHTML;await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/"+a.id,method:"PUT",headers:{"content-type":"application/json",apikey:f,username:l},data:{title:e,done:a.done,order:s}}),await y(),$("body").loading("stop")}},setup(){const a=n=>{const o=items.value.filter(t=>t.done==n);return o.sort((t,i)=>t.order>i.order?1:-1),n?done_li=JSON.parse(JSON.stringify(o)):undone_li=JSON.parse(JSON.stringify(o)),o},e=async function(n){$("body").loading({message:"Updating Done..."}),await axios({url:"https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/"+n.id,method:"PUT",headers:{"content-type":"application/json",apikey:f,username:l},data:{title:n.title,done:n.done,order:n.order}}),await y(),$("body").loading("stop")};return{getDone:a,onDrop:async(n,o)=>{const t=n.dataTransfer.getData("itemID"),i=items.value.find(w=>w.id==t);i.done!=o&&(i.done=o,e(i))},startDrag:(n,o)=>{n.dataTransfer.dropEffect="move",n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("itemID",o.id)}}}},C={key:0},L=r("h2",{id:"page_title"},null,-1),O=r("h2",null,"To Do",-1),E=["onDragstart"],I=m(". "),N=["onClick"],P=["onClick"],S=r("h2",null,"Done",-1),j=m(),B=["onDragstart"],J=m(" . \u2003 "),M=["onClick"],U=["onClick"],F={key:1},H=r("input",{type:"text",id:"name",value:"parkyoungchan"},null,-1);function R(a,e,s,d,n,o){return n.logged?(c(),p("div",C,[L,r("button",{onClick:e[0]||(e[0]=(...t)=>o.createTodo&&o.createTodo(...t)),class:"btn btn-1"},"\uD560 \uC77C \uCD94\uAC00\uD558\uAE30"),O,r("div",{class:"drop-zone",onDrop:e[1]||(e[1]=t=>d.onDrop(t,!1)),onDragenter:e[2]||(e[2]=g(()=>{},["prevent"])),onDragover:e[3]||(e[3]=g(()=>{},["prevent"]))},[(c(!0),p(v,null,b(d.getDone(!1),t=>(c(),p("div",{key:t.id,class:"drag-el",draggable:"true",onDragstart:i=>d.startDrag(i,t)},[r("h4",null,[r("span",{ref:t.id+"order",contenteditable:"true"},u(t.order),513),I,r("span",{ref:t.id+"title",contenteditable:"true"},u(t.title),513)]),r("p",null,"\uCD5C\uC885\uC218\uC815\uC77C: "+u(t.updatedAt),1),r("button",{onClick:i=>o.deleteTodo(t.id)},"\uC0AD\uC81C\uD558\uAE30",8,N),r("button",{onClick:i=>o.updateTodo(t)},"\uC218\uC815\uD558\uAE30",8,P)],40,E))),128))],32),S,j,r("button",{onClick:e[4]||(e[4]=(...t)=>o.deleteAll&&o.deleteAll(...t))},"\uC644\uB8CC\uB41C \uD560\uC77C \uBE44\uC6B0\uAE30"),r("div",{class:"drop-zone",onDrop:e[5]||(e[5]=t=>d.onDrop(t,!0)),onDragenter:e[6]||(e[6]=g(()=>{},["prevent"])),onDragover:e[7]||(e[7]=g(()=>{},["prevent"]))},[(c(!0),p(v,null,b(d.getDone(!0),t=>(c(),p("div",{key:t.id,class:"drag-el",draggable:"true",onDragstart:i=>d.startDrag(i,t)},[r("h4",null,[r("span",{ref:t.id+"order",contenteditable:"true"},u(t.order),513),J,r("span",{ref:t.id+"title",contenteditable:"true"},u(t.title),513)]),r("p",null,"\uC0DD\uC131\uC77C: "+u(t.createdAt),1),r("p",null,"\uC218\uC815\uC77C: "+u(t.updatedAt),1),r("button",{onClick:i=>o.deleteTodo(t.id)},"\uC0AD\uC81C\uD558\uAE30",8,M),r("button",{onClick:i=>o.updateTodo(t)},"\uC218\uC815\uD558\uAE30",8,U)],40,B))),128))],32)])):(c(),p("div",F,[H,r("button",{type:"button",onClick:e[8]||(e[8]=(...t)=>o.login&&o.login(...t))},"\uB85C\uADF8\uC778\uD558\uAE30")]))}var z=x(A,[["render",R]]);const K=k(z);K.mount("#app");
