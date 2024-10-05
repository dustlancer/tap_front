<template>
    <div class="container mx-auto px-4 py-8">
      <!-- Информация о пригласившем игроке -->
      <div v-if="inviter" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Вас пригласил:</h2>
        <div class="p-4 bg-gray-100 rounded-lg">
          <p class="text-xl font-semibold">{{ inviter.username }}</p>
          <p>Уровень: {{ inviter.level }}</p>
        </div>
      </div>
  
      <!-- Список рефералов -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Ваши рефералы:</h2>
        <div v-if="referrals.length > 0">
          <ul>
            <li
              v-for="referral in referrals"
              :key="referral.id"
              class="p-4 bg-gray-100 rounded-lg mb-2"
            >
              <p class="text-xl font-semibold">{{ referral.username }}</p>
              <p>Уровень: {{ referral.level }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>У вас пока нет рефералов.</p>
        </div>
      </div>
  
      <!-- Кнопка для копирования реферальной ссылки -->
      <div class="text-center">
        <button
          @click="copyReferralLink(user_id)"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Скопировать реферальную ссылку
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { useRuntimeConfig } from '#imports';
  import { useUserStore } from '~/stores/user';

  export default {
    data () {
      return {
        inviter: null,
        referrals: [],
      }
    },
    methods: {
      async fetchFriends () {
        try {
          const config = useRuntimeConfig();
          const response = await fetch(`${config.public.apiBase}/api/get_friends/`)
          const data = await response.json()
          this.inviter = data.inviter
          this.referrals = data.referrals
        //   this.user_id = data.user_id // Если user_id приходит с бэкенда
        } catch (error) {
          console.error('Ошибка при получении друзей:', error)
        }
      },
      async copyReferralLink (user_id) {
        try {
          const config = useRuntimeConfig();
          const user = useUserStore();
          const response = await fetch(`${config.public.apiBase}/api/get_referral_link?_user_id=${user.user_id}`)
          const data = await response.json()
          const referralLink = data.referral_link
          await navigator.clipboard.writeText(referralLink)
          alert('Реферальная ссылка скопирована в буфер обмена!')
        } catch (error) {
          console.error('Ошибка при копировании реферальной ссылки:', error)
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
