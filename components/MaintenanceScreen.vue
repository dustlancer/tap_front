<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-gray-800 text-white">
      <!-- Центровое изображение (или иконка обслуживания) -->
      <div class="text-center">
        <div class="relative flex">
            <img src="/maintance_coin.png" alt="Maintenance Image" class="w-[90px] absolute top-[15px] left-[45px] z-10 floating" />
            <img src="/maintance_no_coin.png" alt="Maintenance Image" class="w-[300px] mb-4 mx-auto z-20" />
            
        </div>
        <h2 class="text-4xl font-bold mb-4">Бот на обслуживании</h2>
        <p class="text-lg">Извините за неудобства.<br>Пожалуйста, зайдите позже.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  // Здесь не требуется дополнительных скриптов
  </script>
  
  <style scoped>
  /* Flexbox для центровки содержимого */
  .flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  .floating {
    animation: float 2s ease-in-out infinite;
  }
  </style>
  