<template>
  <div class="p-4 bg-gradient-to-br from-sky-500 to-indigo-500 h-screen pt-[75px] pb-[70px]">
    <!-- <h1 class="text-2xl font-bold text-white mb-4">Задания</h1> -->

    <div class="task h-[100%] overflow-y-scroll scrollable pt-[10px] pb-[30px]" style="overflow-y: auto;">
      
        <!-- Невыполненные задания -->
        <div v-if="pendingTasks.length">
          <h2 class="text-xl font-semibold text-white mb-2">Доступные задания</h2>
          <TaskItem
            v-for="task in pendingTasks"
            :key="task.id"
            :task="task"
          />
        </div>

        <!-- Завершённые задания -->
        <div v-if="completedTasks.length" class="mt-8">
          <h2 class="text-xl font-semibold text-white mb-2">Завершённые задания</h2>
          <TaskItem
            v-for="task in completedTasks"
            :key="task.id"
            :task="task"
          />
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TaskItem from '@/components/Tasks/TaskItem.vue';
import tasksData from '@/assets/tasks.json';

const tasks = ref([]);

// Загружаем задания из JSON при монтировании компонента
onMounted(() => {
  tasks.value = tasksData;
});

// Фильтрация доступных и завершённых заданий
const pendingTasks = computed(() =>
  tasks.value.filter(task => !task.done || (task.done && !task.claimed))
);

const completedTasks = computed(() =>
  tasks.value.filter(task => task.done && task.claimed)
);
</script>
