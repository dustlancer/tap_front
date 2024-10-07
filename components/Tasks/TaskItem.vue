<template>
  <div :class="{ 'opacity-50': task.is_completed && task.is_claimed }" class="p-4 mb-4 bg-gray-800 text-white shadow rounded flex justify-between items-center">
    <div>
      <h3 class="text-lg font-semibold">{{ task.title }}</h3>
      <p class="text-sm text-gray-300">{{ task.reward }} очков</p>
    </div>
    <div>
      <!-- Кнопка "Выполнить" -->
      <button
        v-if="!task.is_completed && !task.is_claimed"
        @click="openLink"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {{ buttonText }}
      </button>

      <!-- Кнопка "Проверить" -->
      <button
        v-if="task.is_completed && !task.is_claimed && !loading && !task.canClaim"
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
        v-if="task.is_completed && !task.is_claimed && !loading && task.canClaim"
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
import { useUserStore } from '~/stores/user';

const props = defineProps({
  task: Object,
});

const userStore = useUserStore();
const buttonText = ref('Выполнить');
const loading = ref(false);

// Открытие ссылки задания
const openLink = () => {
  if (props.task.link) {
    window.open(props.task.link, '_blank');
    buttonText.value = 'Проверить';
    props.task.is_completed = true;
    props.task.canClaim = false;
  } else {
    console.error("Задание не содержит корректной ссылки.");
  }
};

// Запуск лоадера при проверке
const startLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    props.task.canClaim = true;
  }, 5000);
};

// Забрать очки
const claimPoints = async () => {
  try {
    loading.value = true;
    // Отправляем запрос на сервер для клейма награды
    await userStore.claimTaskReward(props.task.id);
    props.task.is_claimed = true;
  } catch (error) {
    console.error('Ошибка при попытке забрать награду:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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
