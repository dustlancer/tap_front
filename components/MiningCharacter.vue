<template>
    <div class="flex flex-col absolute top-0 w-screen z-10 items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-gray-700"
    @click="increaseCoins">
      <div :style="backgroundImageStyle"></div>
      <!-- Счётчик монет -->
      <div class="absolute top-[15%] flex items-center text-4xl font-bold text-white mb-4">
        <div>
          <p class="">{{ coins }}</p>
        </div>
        <!-- <div>
          <img src="/coin.png" alt="Coin Icon" class="w-10 h-10" />
        </div> -->
      </div>
      
  
      <!-- Изображение персонажа с анимацией увеличения при клике -->
      <img
        :src="characterImage"
        alt="Персонаж"
        class="w-48 h-48 object-contain transition-transform duration-300 absolute top-[35%]"
        :class="{ 'scale-125': isClicked }"
      />
  
      <!-- Анимация текста заработанных очков -->
      <transition-group name="score" tag="div" class="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          v-for="score in scoreList"
          :key="score.id"
          :style="{ top: score.top + 'px', left: score.left + 'px', transform: `translateY(${score.translateY}px)`, opacity: score.opacity }"
          class="absolute text-[30px] font-bold text-white"
        >
          +{{ score.points }}
        </div>
      </transition-group>
    </div>
</template>


  
<script setup>
  import { ref } from 'vue';
  import { useClickStore } from '~/stores/click'


  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const clickStore = useClickStore();
  // Ссылка на изображение персонажа
  const characterImage = ref('/ermak_bomzh-removebg-preview.png');
  const backgroundImg = ref('dirty_city_bg.png')
  
  // Счётчик монет
  const coins = ref(userStore.coins);
  // const coins = useCoins();
  const isClicked = ref(false);

  let timer;
  
  // Массив для анимации текста заработанных очков
  const scoreList = ref([]);
  
  // Функция для увеличения количества монет и запуска анимаций
  function increaseCoins(event) {
    coins.value += 1;
    // balance.value += userStore.coins_per_tap;
    clickStore.incrementClicks();
    userStore.updateLocalCoins();
    // Запускаем анимацию увеличения персонажа
    isClicked.value = true;
    setTimeout(() => {
      isClicked.value = false;
    }, 100);
  
    // Добавляем новый элемент для анимации текста
    const newScore = {
      id: Date.now(),
      points: userStore.coins_per_tap, // Заработанные очки
      top: event.clientY - 50, // Позиция по Y, с небольшим смещением
      left: event.clientX, // Позиция по X
      translateY: 0, // Начальное значение для перемещения по Y
      opacity: 1 // Начальная непрозрачность
    };
  
    scoreList.value.push(newScore);
  
    // Запускаем анимацию сразу
    requestAnimationFrame(() => {
      const scoreIndex = scoreList.value.findIndex(score => score.id === newScore.id);
      if (scoreIndex !== -1) {
        scoreList.value[scoreIndex].translateY = -75; // Двигаем вверх на 50px
        scoreList.value[scoreIndex].opacity = 0; // Исчезаем
      }
    });
  
    // Убираем элемент через 1 секунду
    setTimeout(() => {
      scoreList.value = scoreList.value.filter(score => score.id !== newScore.id);
    }, 1200);
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
  function set_images() {
    characterImage.value = config.public.apiBase + userStore.level.character_image_url;
    backgroundImg.value = config.public.apiBase + userStore.level.background_image_url;
  };

  onMounted(() => {
    set_images();
    timer = setInterval(() => {
      clickStore.sendClicksToBackend(); // Отправляем клики на бэкенд
    }, 5000); // 10 секунд
  });

    
</script>
  
<style scoped>
  /* Добавляем анимацию для текста */
  .score-enter-active, .score-leave-active {
    transition: all 1s ease-out;
  }
  /* Контурное изображение */
  .image-overlay {
    width: 100%;
    height: 100%;
    background-image: url('dirty_city_bg.png'); /* Путь к вашему изображению */
    background-size: cover;
    background-position: center;
    filter: grayscale(100%) contrast(400%); /* Чёрно-белый фильтр и усиление контуров */
    mix-blend-mode: screen; /* Наложение контура на синий фон */
    opacity: 0.7; /* Прозрачность, чтобы контуры были более мягкими */
  }
</style>
  