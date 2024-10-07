<template>
  <div class="p-4 bg-gradient-to-br from-sky-500 to-indigo-500 h-screen pt-[75px] pb-[70px]">
    <div class="task h-[100%] overflow-y-scroll scrollable pt-[10px] pb-[30px]" style="overflow-y: auto;">
      <!-- Невыполненные задания -->
      <div v-if="pendingTasks.length">
        <h2 class="text-xl font-semibold text-white mb-2">Доступные задания</h2>
        <TaskItem
          v-for="task in pendingTasks"
          :key="task.id"
          :task="task"
          @claim="claimPoints"
        />
      </div>
      <!-- Завершённые задания -->
      <div v-if="completedTasks.length" class="mt-8">
        <h2 class="text-xl font-semibold text-white mb-2">Завершённые задания</h2>
        <TaskItem
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
          @claim="claimPoints"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import TaskItem from '@/components/Tasks/TaskItem.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const tasks = ref([]);

// Загружаем задания с сервера при монтировании компонента
onMounted(async () => {
  await userStore.fetchTasks();
  tasks.value = userStore.tasks; // Загружаем реальные задания из хранилища
});

// Клейм награды за задание
const claimPoints = async (taskId) => {
  await userStore.claimTaskReward(taskId);
};

// Фильтрация доступных и завершённых заданий
const pendingTasks = computed(() =>
  tasks.value.filter(task => !task.is_completed || (task.is_completed && !task.is_claimed))
);

const completedTasks = computed(() =>
  tasks.value.filter(task => task.is_completed && task.is_claimed)
);
</script>
