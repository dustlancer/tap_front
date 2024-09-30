import { defineStore } from 'pinia';
import { useUserStore } from './user'; 
import { useRuntimeConfig } from '#app'; 


export const useClickStore = defineStore('clickStore', {
  state: () => ({
    localClicks: 0,
    totalClicks: 0,
    localCoins: useUserStore().coins,
  }),
  actions: {
    incrementClicks() {
      this.localClicks += 1;
      this.totalClicks += 1;
      useUserStore().localCoins = useUserStore().coins_per_tap;
    },
    async sendClicksToBackend() {
      if (this.localClicks > 0) {
        console.log(JSON.stringify({ clicks: this.localClicks, user_id: useUserStore().user_id }));
        try {
          // Отправка на бэкенд (например, через fetch или axios)
          const config = useRuntimeConfig(); // Доступ к переменным среды
          const apiUrl = config.public.apiBase; // Доступ к API URL
          const response = await fetch(`${apiUrl}/clicks/`, {
            method: 'POST',
            body: JSON.stringify({
              clicks: this.localClicks,
              user_id: useUserStore().user_id,  // user_id нужно брать динамически, если это необходимо
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Проверяем, что запрос успешен
          if (response.ok) {
            const data = await response.json();

            // Обработка данных ответа
            const userStore = useUserStore();
            userStore.updateCoins(data.current_points); // Обновляем очки пользователя в userStore
            console.log('ok');

            // Обнуляем локальные клики после успешной отправки
            this.localClicks = 0;
          } else {
            console.error('Ошибка при отправке кликов на сервер:', response.statusText);
          }
        } catch (error) {
          console.error('Ошибка при отправке кликов на сервер:', error);
        }
      }
    },
  },
  getters: {
    getTotalClicks: (state) => state.totalClicks,
  },
});