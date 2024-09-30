<template>
    <div :class="{ 'opacity-50': task.done && task.claimed }" class="p-4 mb-4 bg-gray-800 text-white shadow rounded flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold">{{ task.title }}</h3>
        <p class="text-sm text-gray-300">{{ task.points }} очков</p>
      </div>
      <div>
        <!-- Кнопка "Выполнить" -->
        <button
          v-if="!task.done && !task.claimed"
          @click="openLink"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {{ buttonText }}
        </button>
  
        <!-- Кнопка "Проверить" -->
        <button
          v-if="task.done && !task.claimed && !loading && !task.canClaim"
          @click="startLoading"
          class="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Проверить
        </button>
  
        <!-- Лоадер при проверке -->
        <button
          v-if="loading"
          class="bg-gray-500 text-white px-4 py-2 rounded"
          disabled
        >
          <div class="loader"></div>
        </button>
  
        <!-- Кнопка "Забрать" (после проверки) -->
        <button
          v-if="task.done && !task.claimed && !loading && task.canClaim"
          @click="claimPoints"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Забрать
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  
  const toast = useToast();
  const props = defineProps({
    task: Object
  });
  
  const buttonText = ref('Выполнить');
  const loading = ref(false);
  
  // Открытие ссылки задания
  const openLink = () => {
    window.open(props.task.link, '_blank');
    buttonText.value = 'Проверить';
    props.task.done = true;
    props.task.canClaim = false; // Пока что не можем забрать
  };
  
  // Запуск лоадера при проверке
  const startLoading = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      props.task.canClaim = true; // Разрешаем забрать после проверки
    }, 5000);
  };
  
  // Забрать очки
  const claimPoints = () => {
    props.task.claimed = true; // Задача завершена
    toast.success(`Успешно получено ${props.task.points} очков!`);
  };
  </script>
  
  <style scoped>
  /* Лоадер */
  .loader {
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top: 3px solid #ffffff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
  