const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VdqIxu5-.js","./vqYTtcUH.js"])))=>i.map(i=>d[i]);
import{a2 as l,a3 as _,k as n}from"./vqYTtcUH.js";const c={id:454338166,first_name:"Андрей",last_name:"",username:"paenny",language_code:"ru",allows_write_to_pm:!0},p=l("user",{state:()=>({avatar_url:"",user_id:0,level:{level_number:0,level_name:"",speed_increase_percent:0,storage_time_increase_hours:0,character_image_url:"",background_image_url:"",isLoading:!0},mining_speed:0,storage_capacity:0,coins:0,local_coins:0,inviter_id:null}),actions:{async fetchUserData(){let e,s;const r=new URLSearchParams(window.location.search);this.start=r.get("start");try{e=(await _(()=>import("./VdqIxu5-.js"),__vite__mapDeps([0,1]),import.meta.url)).useWebApp,console.error("Ошибка при импорте useWebApp NOT HAPPENED");const{initDataUnsafe:o}=e(),i=o==null?void 0:o.user;i?(s=i,this.start&&(s.inviter_id=this.start),console.info("Connected with tg")):(console.error("Failed to connect with tg, boot locally"),s=c)}catch(t){console.error("Ошибка при импорте useWebApp:",t),s=c}this.isLoading=!0;try{const o=n().public.apiBase,i=await fetch(`${o}/telegram/init/`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(i.ok){const a=await i.json();this.setUserData(a),console.log("User data set successfully:",a)}else console.error("Failed to send user data:",i.status)}catch(t){console.error("Error:",t),this.isMaintenance=!0}finally{this.isLoading=!1}},updateCoins(e){this.coins=e},updateLocalCoins(){this.local_coins=this.local_coins+this.coins_per_tap},setUserData(e){this.avatar_url=e.avatar_url,this.user_id=e.user_id,this.level=e.level,this.mining_speed=e.mining_speed,this.storage_capacity=e.storage_capacity,this.coins=e.coins,this.coins_per_tap=e.coins_per_tap,this.local_coins=e.coins},async claimCoins(e){try{const r=n().public.apiBase,t=await fetch(`${r}/api/claim-coins/`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:this.user_id,claimed_coins:e})});if(!t.ok)throw new Error("Ошибка при попытке забрать монеты");const o=await t.json();this.local_coins+=e}catch(s){console.error("Ошибка при клейме монет:",s)}}}});export{p as u};
