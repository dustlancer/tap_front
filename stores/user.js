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
    local_coins:0
  }),
  actions: {
    async fetchUserData() {
      this.isLoading = true;
      try {
        const config = useRuntimeConfig(); // Доступ к переменным среды
        const apiUrl = config.public.apiBase; // Доступ к API URL
        const response = await fetch(`${apiUrl}/telegram/init/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
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
    }
  }
})
