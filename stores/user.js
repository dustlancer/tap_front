// stores/user.js
import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'; 


const d = {
  "id": 454338166,
  "first_name": "Андрей",
  "last_name": "",
  "username": "paenny",
  "language_code": "ru",
  "allows_write_to_pm": true
};

export const useUserStore = defineStore('user', {
  state: () => ({
    avatar_url: '',
    user_id: 0,
    level: {
      level_number: 0,
      level_name: '',
      speed_increase_percent: 0,
      storage_time_increase_hours: 0,
      character_image_url: '',
      background_image_url: '',
      isLoading: true, // Состояние загрузки
    },
    mining_speed: 0,
    storage_capacity: 0,
    coins: 0,
    local_coins: 0,
    inviter_id: null,
    abraka:null,
    raw_data: undefined,
  }),
  actions: {
    async fetchUserData() {
      let useWebApp;
      let userData;

      try {
        const module = await import('vue-tg');
        useWebApp = module.useWebApp;
        console.error("Ошибка при импорте useWebApp NOT HAPPENED");
        const { initDataUnsafe } = useWebApp();
        const userFromTg = initDataUnsafe?.user;
        this.raw_data = initDataUnsafe;
        if (userFromTg) {
          userData = userFromTg;
          if (initDataUnsafe?.start_param) {
            userData.inviter_id = initDataUnsafe?.start_param;
          }

          this.inviter_id = initDataUnsafe.startapp;
          console.info('Connected with tg')
          let startParam = window.Telegram.WebApp.initDataUnsafe.startapp;
          this.abraka = startParam;
        } else {
          console.error('Failed to connect with tg, boot locally');
          userData = d;
        }

      } catch (error) {
        console.error("Ошибка при импорте useWebApp:", error);
        // Здесь можно обработать ошибку, например, показать уведомление пользователю
        userData = d;
      }



      this.isLoading = true;
    
      try {
        const config = useRuntimeConfig(); // Доступ к переменным среды
        const apiUrl = config.public.apiBase; // Доступ к API URL
        const response = await fetch(`${apiUrl}/telegram/init/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            this.setUserData(data);
            console.log('User data set successfully:', data);
        } else {
            console.error('Failed to send user data:', response.status);

        }
      } catch (error) {
          console.error('Error:', error);
          this.isMaintenance = true;
      } finally {
        this.isLoading = false;
      }
    },
    updateCoins(_coins) {
      this.coins = _coins;
    },
    updateLocalCoins() {
      this.local_coins = this.local_coins + this.coins_per_tap;
    },
    setUserData(data) {
      this.avatar_url = data.avatar_url
      this.user_id = data.user_id
      this.level = data.level
      this.mining_speed = data.mining_speed
      this.storage_capacity = data.storage_capacity
      this.coins = data.coins
      this.coins_per_tap = data.coins_per_tap
      this.local_coins = data.coins
    },
    async claimCoins(coinsInPiggyBank) {
      try {
        const config = useRuntimeConfig(); // Доступ к переменным среды
        const apiUrl = config.public.apiBase; // Доступ к API URL
        const response = await fetch(`${apiUrl}/api/claim-coins/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.user_id,
            claimed_coins: coinsInPiggyBank,
          }),
        });

        if (!response.ok) {
          throw new Error('Ошибка при попытке забрать монеты');
        }

        const data = await response.json();
        // Обновляем время последнего клейма
        this.local_coins += coinsInPiggyBank;
      } catch (error) {
        console.error('Ошибка при клейме монет:', error);
      }
    },
  }
})
