<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-gray-800 text-white">
      <!-- Центровое изображение -->
      <div class="text-center relative">
        <img src="/loading.png" alt="Loading Image" class="w-[300px] -pt-[300px] -mt-10 mb-4" />
        <div class="loader-info absolute -bottom-[80px] w-full">
            <div class="loader mb-2 mx-auto"></div>
            <!-- <h2 class="text-2xl font-bold">Загрузка...</h2> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Здесь не требуется дополнительных скриптов
  </script>
  
  <style scoped>
  /* Лоадер */
  .loader {
    border: 6px solid rgba(255, 255, 255, 0.2);
    border-top: 6px solid #ffffff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  /* Flexbox для центровки содержимого */
  .flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  