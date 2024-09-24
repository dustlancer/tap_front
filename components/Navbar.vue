<template>
    <nav class="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-3 shadow-md z-50">
      <div class="flex justify-around px-2 py-0">
        <nuxt-link to="/tasks" class="nav-item">
          <span class="icon">📋</span>
          <span>Задачи</span>
        </nuxt-link>
        <nuxt-link to="/upgrade" class="nav-item">
          <span class="icon">💪</span>
          <span>Прокачка</span>
        </nuxt-link>
        <nuxt-link to="/" class="nav-item">
          <span class="icon">⛏️</span>
          <span>Майнинг</span>
        </nuxt-link>
        <nuxt-link to="/friends" class="nav-item">
          <span class="icon">👥</span>
          <span>Друзья</span>
        </nuxt-link>
        <nuxt-link to="/airdrop" class="nav-item">
          <span class="icon">🎁</span>
          <span>AirDrop</span>
        </nuxt-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
  }
  .icon {
    font-size: 24px;
  }
  </style>
  