import{u}from"./Z-IjxTk0.js";import{_ as f,k as p,c as i,a as r,t as c,y as g,F as b,z as m,o as l}from"./DG16_9-6.js";const _={data(){return{inviter:null,referrals:[],tg:"where os",referralLink:void 0}},methods:{async fetchFriends(){try{const s=p(),o=await(await fetch(`${s.public.apiBase}/api/get_friends/`)).json();this.inviter=o.inviter,this.referrals=o.referrals}catch(s){console.error("Ошибка при получении друзей:",s)}},async copyReferralLink(s){try{const e=p(),o=u(),a=(await(await fetch(`${e.public.apiBase}/api/get_referral_link?_user_id=${o.user_id}`)).json()).referral_link;await navigator.clipboard.writeText(a);try{const{webApp:t}=useWebApp();t.copyText(a)}catch(t){console.error("Ошибка при копировании реферальной ссылки в тг:",t)}alert("Реферальная ссылка скопирована в буфер обмена!")}catch(e){console.error("Ошибка при копировании реферальной ссылки:",e)}},async shareReferralLink(){const s=u();window.Telegram&&window.Telegram.WebApp?(window.Telegram.WebApp.ready(),this.tg="Приложение запущено в Telegram WebApp"):this.tg="Приложение запущено не в Telegram WebApp";try{const e=p(),d=await(await fetch(`${e.public.apiBase}/api/get_referral_link/?_user_id=${s.user_id}`)).json();console.log(d),this.referralLink=d.referral_link,console.log(this.referralLink),window.Telegram&&window.Telegram.WebApp?(window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(this.referralLink)}&text=Присоединяйся к нам!`),console.log("Открыто окно для отправки ссылки другу через Telegram")):(console.warn("Telegram WebApp API недоступен, открываем напрямую"),window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink.value)}&text=Присоединяйся к нам!`,"_blank"))}catch(e){console.error("Ошибка при отправке реферальной ссылки другу:",e)}}},mounted(){this.fetchFriends()}},h={class:"container mx-auto px-4 py-8 bg-gradient-to-br from-green-500 to-indigo-500 h-screen"},w={key:0,class:"mb-8"},k={class:"p-4 bg-gray-100 rounded-lg"},v={class:"text-xl font-semibold"},y={class:"mb-8"},x={key:0},T={class:"text-xl font-semibold"},L={key:1},A={class:"text-center"},W={class:"text-center"};function R(s,e,o,d,n,a){return l(),i("div",h,[n.inviter?(l(),i("div",w,[e[2]||(e[2]=r("h2",{class:"text-2xl font-bold mb-4"},"Вас пригласил:",-1)),r("div",k,[r("p",v,c(n.inviter.username),1),r("p",null,"Уровень: "+c(n.inviter.level),1)])])):g("",!0),r("div",y,[e[4]||(e[4]=r("h2",{class:"text-2xl font-bold mb-4"},"Ваши рефералы:",-1)),n.referrals.length>0?(l(),i("div",x,[r("ul",null,[(l(!0),i(b,null,m(n.referrals,t=>(l(),i("li",{key:t.id,class:"p-4 bg-gray-100 rounded-lg mb-2"},[r("p",T,c(t.username),1),r("p",null,"Уровень: "+c(t.level),1)]))),128))])])):(l(),i("div",L,e[3]||(e[3]=[r("p",null,"У вас пока нет рефералов.",-1)]))),r("h1",null,c(n.tg),1)]),r("div",A,[r("button",{onClick:e[0]||(e[0]=t=>a.copyReferralLink(s.user_id)),class:"px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"}," Скопировать реферальную ссылку ")]),r("div",W,[r("button",{onClick:e[1]||(e[1]=t=>a.shareReferralLink(s.user_id)),class:"px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"}," Поделиться ссылкой с другом ")])])}const $=f(_,[["render",R],["__scopeId","data-v-d6fd2819"]]);export{$ as default};
