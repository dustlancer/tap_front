<template>
<div class="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-pink-500 to-indigo-500 text-white">
    <!-- Картинка AirDrop -->
    <nuxt-img src="/airdrop.png" alt="AirDrop" class="w-64 h-64 mb-4" />

    <!-- Надписи -->
    <h1 class="text-4xl font-bold mb-2">Скоро</h1>
    <p class="text-lg mb-8">Следите за обновлениями</p>

    <!-- Кнопка "Зарабатывать" -->
    <button @click="goToIndex" class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded">
    Зарабатывать
    </button>
</div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    // Функция для перехода на главную страницу (index)
    const router = useRouter();
    const goToIndex = () => {
        router.push('/');
    };
</script>
