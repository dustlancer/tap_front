import{u as M}from"./DVlfk9Ni.js";import{_ as P,r as o,l as d,q as $,y as T,o as _,c as g,a as e,z as h,t as m,A as j,k as F,b as N}from"./CmotWWxq.js";const U=window.setInterval,V={class:"flex flex-col absolute top-0 w-screen z-10 items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-gray-700"},E=["src"],q={class:"w-full text-center flex-col align-center absolute bottom-[15%] px-7"},A={class:"flex items-center text-4xl font-bold text-white mb-1"},R={class:"text-lg"},G={class:"h-4 bg-gray-300 rounded-full"},H={__name:"MiningCharacter",setup(y){const c=F(),s=M(),t=o(0),a=o(100),v=o(5),f=o("/ermak_bomzh-removebg-preview.png"),p=o("dirty_city_bg.png"),u=o(new Date),x=d(()=>t.value/a.value*100),w=d(()=>t.value>=a.value);let l;function k(){u.value=new Date,s.claimCoins(t.value),t.value=0,clearInterval(l),b()}function I(){const r=(new Date-u.value)/(1e3*60*60),i=Math.min(r*v.value,a.value);t.value=i,i>=a.value&&clearInterval(l)}function b(){l=U(()=>{I()},1e3)}function C(){f.value=c.public.apiBase+s.level.character_image_url,p.value=c.public.apiBase+s.level.background_image_url}const B=d(()=>({backgroundImage:`url(${p.value})`,backgroundSize:"cover",backgroundPosition:"center",filter:"grayscale(100%) contrast(400%)",mixBlendMode:"screen",opacity:.7,width:"100%",height:"100%"}));async function D(){try{const n=await fetch(`${c.public.apiBase}/api/user-storage/?user_id=${s.user_id}`);if(!n.ok)throw new Error("Ошибка загрузки данных пользователя");const r=await n.json(),{storage_capacity:i,mining_speed:S,last_claim_time:z}=r;a.value=i,v.value=S,u.value=new Date(z),b()}catch(n){console.error("Ошибка при загрузке данных: ",n)}}return $(()=>{C(),D()}),T(()=>{l&&clearInterval(l)}),(n,r)=>(_(),g("div",V,[e("div",{style:h(B.value)},null,4),e("img",{src:f.value,alt:"Персонаж",class:"w-48 h-48 object-contain transition-transform duration-300 absolute"},null,8,E),e("div",q,[e("div",A,[e("div",null,[e("p",R,m(t.value.toFixed(2))+" / "+m(a.value.toFixed(2)),1)])]),e("div",G,[e("div",{class:"h-full bg-green-500 rounded-full transition-all duration-500",style:h({width:x.value+"%"})},null,4)])]),w.value?(_(),g("button",{key:0,onClick:k,class:"absolute bottom-[23%] bg-yellow-400 text-black font-bold py-2 px-4 rounded"}," Забрать "+m(t.value.toFixed(2))+" монет ",1)):j("",!0)]))}},J=P(H,[["__scopeId","data-v-d415098f"]]),K={class:"bg-gray-20 overflow-hidden"},Q={__name:"index",setup(y){return(c,s)=>(_(),g("div",K,[N(J)]))}};export{Q as default};
