import{_ as v,r as u,o as e,c as s,a as i,t as k,C as r,A as w,q as y,l as p,v as m,F as b,B as h,D as x}from"./DIdVoVMo.js";import{u as T}from"./Cxjd3_tQ.js";const _={class:"text-lg font-semibold"},C={class:"text-sm text-gray-300"},B={key:2,class:"bg-gray-500 text-white px-4 py-2 rounded",disabled:""},I={__name:"TaskItem",props:{task:Object},setup(t){const a=t,c=u("Выполнить"),o=u(!1),l=()=>{window.open(a.task.link,"_blank"),c.value="Проверить",a.task.done=!0,a.task.canClaim=!1},d=()=>{o.value=!0,setTimeout(()=>{o.value=!1,a.task.canClaim=!0},5e3)},n=()=>{a.task.claimed=!0};return(N,f)=>(e(),s("div",{class:w([{"opacity-50":t.task.done&&t.task.claimed},"p-4 mb-4 bg-gray-800 text-white shadow rounded flex justify-between items-center"])},[i("div",null,[i("h3",_,k(t.task.title),1),i("p",C,k(t.task.points)+" очков",1)]),i("div",null,[!t.task.done&&!t.task.claimed?(e(),s("button",{key:0,onClick:l,class:"bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"},k(c.value),1)):r("",!0),t.task.done&&!t.task.claimed&&!o.value&&!t.task.canClaim?(e(),s("button",{key:1,onClick:d,class:"bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded"}," Проверить ")):r("",!0),o.value?(e(),s("button",B,f[0]||(f[0]=[i("div",{class:"loader"},null,-1)]))):r("",!0),t.task.done&&!t.task.claimed&&!o.value&&t.task.canClaim?(e(),s("button",{key:3,onClick:n,class:"bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"}," Забрать ")):r("",!0)])],2))}},g=v(I,[["__scopeId","data-v-0cc37872"]]),$=[{id:1,title:"Подписаться на Telegram-канал",points:100,done:!1,claimed:!1,link:"https://t.me/some_channel"},{id:2,title:"Лайкнуть пост в Instagram",points:50,done:!1,claimed:!1,link:"https://instagram.com/some_post"},{id:3,title:"Подписаться на Twitter",points:70,done:!1,claimed:!1,link:"https://twitter.com/some_profile"},{id:3,title:"Подписаться на Twitter",points:70,done:!1,claimed:!1,link:"https://twitter.com/some_profile"},{id:3,title:"Подписаться на Twitter",points:70,done:!1,claimed:!1,link:"https://twitter.com/some_profile"},{id:3,title:"Подписаться на Twitter",points:70,done:!1,claimed:!1,link:"https://twitter.com/some_profile"},{id:3,title:"Подписаться на Twitter",points:70,done:!1,claimed:!1,link:"https://twitter.com/some_profile"},{id:3,title:"Подписаться на Twitter",points:70,done:!1,claimed:!1,link:"https://twitter.com/some_profile"}],D={class:"p-4 bg-gradient-to-br from-sky-500 to-indigo-500 h-screen pt-[75px] pb-[70px]"},L={class:"task h-[100%] overflow-y-scroll scrollable pt-[10px] pb-[30px]",style:{"overflow-y":"auto"}},j={key:0},F={key:1,class:"mt-8"},q={__name:"tasks",setup(t){T();const a=u([]);u(void 0),y(()=>{a.value=$});const c=p(()=>a.value.filter(l=>!l.done||l.done&&!l.claimed)),o=p(()=>a.value.filter(l=>l.done&&l.claimed));return(l,d)=>(e(),s("div",D,[i("div",L,[m(c).length?(e(),s("div",j,[d[0]||(d[0]=i("h2",{class:"text-xl font-semibold text-white mb-2"},"Доступные задания",-1)),(e(!0),s(b,null,h(m(c),n=>(e(),x(g,{key:n.id,task:n},null,8,["task"]))),128))])):r("",!0),m(o).length?(e(),s("div",F,[d[1]||(d[1]=i("h2",{class:"text-xl font-semibold text-white mb-2"},"Завершённые задания",-1)),(e(!0),s(b,null,h(m(o),n=>(e(),x(g,{key:n.id,task:n},null,8,["task"]))),128))])):r("",!0)])]))}};export{q as default};
