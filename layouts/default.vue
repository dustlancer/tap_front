<script setup>
import Navbar from '@/components/Navbar.vue';
import TopBar from '@/components/TopBar.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useUserStore } from '~/stores/user'

// Добавляем скрипт для Telegram WebApp
useHead({
  script: [
    { src: 'https://telegram.org/js/telegram-web-app.js', defer: true },
  ],
});


const isMaintenance = ref(false); // Флаг для экрана обслуживания
const userStore = useUserStore();  // Подключаем Store


// Функция для предотвращения скролла на странице
function preventScroll(e) {
  // Разрешаем прокрутку внутри элементов с классом 'scrollable'
  const scrollableElement = e.target.closest('.scrollable');
  if (scrollableElement) {
    // Проверка, чтобы только внутренний контент прокручивался, если есть куда скроллить
    const isScrollable = scrollableElement.scrollHeight > scrollableElement.clientHeight;
    if (isScrollable) return; // Не блокируем событие scroll
  }

  // В остальных случаях предотвращаем скролл
  e.preventDefault();
}

onMounted(async () => {
  // isMaintenance.value = true; // Включи это, если бот на обслуживании
  await userStore.fetchUserData(); // Вызов функции загрузки данных при запуске приложения
  // setTimeout(() => {
  //   loading.value = false; // Убираем экран загрузки
  // }, 1000); // Задержка на 2 секунды для демонстрации
   // Пример проверки состояния бота (может быть заменён запросом к API)
  
  document.addEventListener('touchmove', preventScroll, { passive: false });
});

const loading = computed(() => userStore.isLoading); // Связываем состояние загрузки


onBeforeUnmount(() => {
  document.removeEventListener('touchmove', preventScroll);
});
</script>

<template>
  <div>
    <main>
        <!-- Экран обслуживания -->
        <MaintenanceScreen v-if="isMaintenance" />
        <!-- Экран загрузки -->
        <LoadingScreen v-else-if="loading" />
        <ClientOnly v-else>
          <TopBar/>
          <!-- Пример элемента, который можно прокручивать -->     
            <slot />
          <Navbar/>
        </ClientOnly>
    </main>
  </div>
</template>

<style>
html, body {
  overscroll-behavior: none; /* Отключаем эффекты overscroll */
  height: 100%;
  margin: 0;
  padding: 0;
}

body.no-scroll {
  position: fixed;
  width: 100%;
}

/* Добавляем класс для элементов с прокруткой */
.scrollable {
  /* Пример ограничения высоты */ 
  overflow-y: auto; /* Включаем вертикальный скролл */
}
</style>
