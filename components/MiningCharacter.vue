<template>
  <div class="flex flex-col absolute top-0 w-screen z-10 items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-gray-700">
    <div :style="backgroundImageStyle"></div>

    <!-- Изображение персонажа -->
    <img
      :src="characterImage"
      alt="Персонаж"
      class="w-48 h-48 object-contain transition-transform duration-300 absolute"
    />

    <!-- Счётчик монет в копилке без анимации -->
    <div class="w-full text-center flex-col align-center absolute bottom-[15%] px-7">
      <div class="flex items-center text-4xl font-bold text-white mb-1">
        <div>
          <p class="text-lg">{{ coinsInPiggyBank.toFixed(2) }} / {{ maxCoinsInPiggyBank.toFixed(2) }}</p>
        </div>
      </div>
      <div class="h-4 bg-gray-300 rounded-full">
        <div class="h-full bg-green-500 rounded-full transition-all duration-500" :style="{ width: fillPercentage + '%' }"></div>
      </div>
    </div>

    <!-- Кнопка для забора монет -->
    <button
      v-if="canClaim"
      @click="claimCoins"
      class="absolute bottom-[23%] bg-yellow-400 text-black font-bold py-2 px-4 rounded"
    >
      Забрать {{ coinsInPiggyBank.toFixed(2) }} монет
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '~/stores/user';
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();
const userStore = useUserStore();

const coinsInPiggyBank = ref(0);
const maxCoinsInPiggyBank = ref(userStore.storage_capacity); // Максимальная ёмкость копилки
const miningSpeed = ref(5); // Скорость майнинга (монеты в час)
const characterImage = ref('/ermak_bomzh-removebg-preview.png');
const backgroundImg = ref('dirty_city_bg.png');
const lastClaimTime = ref(new Date());

let fillPercentage = 0;
let canClaim = false;

let intervalId;

function claimCoins() {
  // Обновляем время последнего клейма
  lastClaimTime.value = new Date();
  userStore.claimCoins(coinsInPiggyBank.value);

  // Обнуляем количество монет и начинаем процесс накопления заново
  coinsInPiggyBank.value = 0;

  // Сбрасываем таймер и запускаем процесс заполнения копилки заново
  clearInterval(intervalId);
  startTimer();
}

function updatePiggyBank() {
  const currentTime = new Date();
  const timeDiff = (currentTime - lastClaimTime.value) / (1000 * 60 * 60); // Разница во времени в часах
  const minedCoins = Math.min(timeDiff * miningSpeed.value, maxCoinsInPiggyBank.value);

  coinsInPiggyBank.value = minedCoins;
  fillPercentage = computed(() => (coinsInPiggyBank.value / maxCoinsInPiggyBank.value) * 100);
  canClaim = computed(() => coinsInPiggyBank.value >= maxCoinsInPiggyBank.value);

  // Если копилка заполнилась, останавливаем таймер
  if (minedCoins >= maxCoinsInPiggyBank.value) {
    clearInterval(intervalId);
  }
}

function startTimer() {
  intervalId = setInterval(() => {
    updatePiggyBank();
  }, 1000); // Обновляем каждые 1 секунду
}

function set_images() {
  characterImage.value = config.public.apiBase + userStore.level.character_image_url;
  backgroundImg.value = config.public.apiBase + userStore.level.background_image_url;
}

const backgroundImageStyle = computed(() => ({
  backgroundImage: `url(${backgroundImg.value})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'grayscale(100%) contrast(400%)',
  mixBlendMode: 'screen',
  opacity: 0.7,
  width: '100%',
  height: '100%',
}))

async function fetchUserData() {
  try {
    const response = await fetch(`${config.public.apiBase}/api/user-storage/?user_id=${userStore.user_id}`);
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных пользователя");
    }
    const data = await response.json();
    const { storage_capacity, mining_speed, last_claim_time } = data;
    
    maxCoinsInPiggyBank.value = storage_capacity;
    miningSpeed.value = mining_speed;
    lastClaimTime.value = new Date(last_claim_time);
    
    // Запускаем таймер для обновления копилки
    startTimer();
  } catch (error) {
    console.error("Ошибка при загрузке данных: ", error);
  }
}

onMounted(() => {
  set_images();
  setTimeout(() => {
    fetchUserData(); // Загружаем данные пользователя
  }, 0);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId); // Очищаем таймер при размонтировании компонента
  }
});
</script>

<style scoped>
/* Больше нет анимации для счётчика */
</style>
