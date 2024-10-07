<template>
    <div class="container mx-auto px-4 py-8 pb-[100px] bg-gradient-to-br from-green-500 to-indigo-500 h-screen text-white overflow-auto">
      <!-- Информация о пригласившем игроке -->
      <div v-if="inviter" class="mb-8 mt-[60px]">
        <h2 class="text-2xl font-bold mb-4">Вас пригласил:</h2>
        <div class="p-4 bg-blue-500 rounded-lg flex items-center justify-between">
          <p class="text-xl font-semibold">{{ inviter.username }}</p>
          <p class="pt-[2px] text-sm font-lighter">{{ inviter.level }}</p>
        </div>
      </div>
  
      <!-- Список рефералов -->
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-4">Ваши рефералы:</h2>
        <div v-if="referrals.length > 0" class="h- overflow-auto">
          <ul>
            <div
              v-for="referral in referrals"
              :key="referral.id"
              class="p-4 py-3 bg-blue-500 rounded-lg flex items-center justify-between mb-2"
            >
              <p class="text-xl font-semibold">{{ referral.username }}</p>
              <p class="pt-[2px] text-sm font-lighter">{{ referral.level }}</p>
            </div>
          </ul>
        </div>
        <div v-else class="text-center">
          <p>У вас пока нет рефералов.</p>
        </div>
      </div>
  
      <!-- Кнопка для отправки ссылки другу -->
        <div class="text-center">
            <button
            @click="shareReferralLink(user_id)"
            class="px-6 py-4 bg-green-500 text-white rounded-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            Пригласить друга
            </button>
        </div>
    </div>
  </template>
  
  <script>
  import { useRuntimeConfig } from '#imports';
  import { useUserStore } from '~/stores/user';
//   import { useWebApp } from 'vue-tg';

  export default {
    data () {
      return {
        inviter: null,
        referrals: [],
        tg: 'where os',
        referralLink: undefined,
        refferalCaption: 'Начни майнить ErmakCoin!',
        user: useUserStore(),
      }
    },
    methods: {
      async fetchFriends () {
        try {
          const config = useRuntimeConfig();
          const response = await fetch(`${config.public.apiBase}/api/get_friends/?_user_id=${this.user.user_id}`)
          const data = await response.json()
          this.inviter = data.inviter
          this.referrals = data.referrals
        } catch (error) {
          console.error('Ошибка при получении друзей:', error)
        }
      },
      async shareReferralLink() {
        const user = useUserStore();
        try {
            const config = useRuntimeConfig();
            const response = await fetch(`${config.public.apiBase}/api/get_referral_link/?_user_id=${this.user.user_id}`)
            const data = await response.json()
            console.log(data);
            this.referralLink = data.referral_link
            console.log(this.referralLink)

            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(this.referralLink)}&text=${this.refferalCaption}`)
                console.log('Открыто окно для отправки ссылки другу через Telegram')
            } else {
                console.warn('Telegram WebApp API недоступен, открываем напрямую')
                window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink.value)}&text=Присоединяйся к нам!`, '_blank')
            }
        } catch (error) {
            console.error('Ошибка при отправке реферальной ссылки другу:', error)
        }
    }
    },
    mounted () {
      this.fetchFriends()
    }
  }
  </script>

<style scoped>
/* Дополнительная стилизация при необходимости */
</style>
