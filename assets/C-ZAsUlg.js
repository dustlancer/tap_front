import{u as p}from"./CbUUaoxO.js";import{_ as f,k as a,c as s,a as t,t as o,y as b,F as c,z as u,o as n}from"./C0NY8lX_.js";const _={data(){return{inviter:null,referrals:[],tg:"where os",referralLink:void 0,refferalCaption:"Начни майнить ErmakCoin!",user:p()}},methods:{async fetchFriends(){try{const i=a(),d=await(await fetch(`${i.public.apiBase}/api/get_friends/?_user_id=${this.user.user_id}`)).json();this.inviter=d.inviter,this.referrals=d.referrals}catch(i){console.error("Ошибка при получении друзей:",i)}},async shareReferralLink(){p();try{const i=a(),d=await(await fetch(`${i.public.apiBase}/api/get_referral_link/?_user_id=${this.user.user_id}`)).json();console.log(d),this.referralLink=d.referral_link,console.log(this.referralLink),window.Telegram&&window.Telegram.WebApp?(window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(this.referralLink)}&text=${this.refferalCaption}`),console.log("Открыто окно для отправки ссылки другу через Telegram")):(console.warn("Telegram WebApp API недоступен, открываем напрямую"),window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink.value)}&text=Присоединяйся к нам!`,"_blank"))}catch(i){console.error("Ошибка при отправке реферальной ссылки другу:",i)}}},mounted(){this.fetchFriends()}},x={class:"container mx-auto px-4 py-8 pb-[100px] bg-gradient-to-br from-green-500 to-indigo-500 h-screen text-white overflow-auto"},h={key:0,class:"mb-8 mt-[60px]"},g={class:"p-4 bg-blue-500 rounded-lg flex items-center justify-between"},v={class:"text-xl font-semibold"},y={class:"pt-[2px] text-sm font-lighter"},w={class:"mb-4"},k={key:0,class:"h- overflow-auto"},j={class:"text-xl font-semibold"},L={class:"pt-[2px] text-sm font-lighter"},C={class:"text-xl font-semibold"},T={class:"pt-[2px] text-sm font-lighter"},B={class:"text-xl font-semibold"},R={class:"pt-[2px] text-sm font-lighter"},A={class:"text-xl font-semibold"},F={class:"pt-[2px] text-sm font-lighter"},I={class:"text-xl font-semibold"},U={class:"pt-[2px] text-sm font-lighter"},W={class:"text-xl font-semibold"},E={class:"pt-[2px] text-sm font-lighter"},N={class:"text-xl font-semibold"},S={class:"pt-[2px] text-sm font-lighter"},V={class:"text-xl font-semibold"},z={class:"pt-[2px] text-sm font-lighter"},D={key:1,class:"text-center"},P={class:"text-center"};function q(i,r,d,G,l,m){return n(),s("div",x,[l.inviter?(n(),s("div",h,[r[1]||(r[1]=t("h2",{class:"text-2xl font-bold mb-4"},"Вас пригласил:",-1)),t("div",g,[t("p",v,o(l.inviter.username),1),t("p",y,o(l.inviter.level),1)])])):b("",!0),t("div",w,[r[3]||(r[3]=t("h2",{class:"text-2xl font-bold mb-4"},"Ваши рефералы:",-1)),l.referrals.length>0?(n(),s("div",k,[t("ul",null,[(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",j,o(e.username),1),t("p",L,o(e.level),1)]))),128)),(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",C,o(e.username),1),t("p",T,o(e.level),1)]))),128)),(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",B,o(e.username),1),t("p",R,o(e.level),1)]))),128)),(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",A,o(e.username),1),t("p",F,o(e.level),1)]))),128)),(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",I,o(e.username),1),t("p",U,o(e.level),1)]))),128)),(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",W,o(e.username),1),t("p",E,o(e.level),1)]))),128)),(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",N,o(e.username),1),t("p",S,o(e.level),1)]))),128)),(n(!0),s(c,null,u(l.referrals,e=>(n(),s("div",{key:e.id,class:"p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"},[t("p",V,o(e.username),1),t("p",z,o(e.level),1)]))),128))])])):(n(),s("div",D,r[2]||(r[2]=[t("p",null,"У вас пока нет рефералов.",-1)])))]),t("div",P,[t("button",{onClick:r[0]||(r[0]=e=>m.shareReferralLink(i.user_id)),class:"px-6 py-4 bg-green-500 text-white rounded-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"}," Пригласить друга ")])])}const K=f(_,[["render",q],["__scopeId","data-v-84852bcb"]]);export{K as default};
