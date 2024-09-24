<template>
    <div class="fixed flex top-0 w-full justify-between items-center p-4 py-1 bg-gray-800 text-white z-50"
    @click="get_avatar">
        <!-- Аватар пользователя и уровень -->
        <div class="flex flex-col items-center space-x-2 relative">
            <img 
                :src="avatar" 
                alt="User Avatar" 
                class="w-12 h-12 rounded-full object-cover"
            />
            <div class="flex flex-col text-sm font-bold">
                <span>{{ level }} ур.</span>
            </div>
        </div>

        <!-- Компонент "Монеты в час" -->
        <div class="flex flex-col items-start">
            <span class="font-thin text-sm">Монет в час</span>
            <div class="flex items-center space-x-1 font-bold">
                <img src="/coin.png" alt="Coin Icon" class="w-6 h-6" />
                <span>{{ coinsPerHour }}</span>
            </div>
        </div>

        <div class="flex flex-col items-start">
            <span class="font-thin text-sm">Баланс</span>
            <div class="flex items-center space-x-1 font-bold">
                <img src="/coin.png" alt="Coin Icon" class="w-6 h-6" />
                <span>{{ coinsPerHour }}</span>
            </div>
        </div>

        <!-- Кнопка Community -->
        <button class="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700">
        Ваучеры
        </button>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useWebApp } from 'vue-tg';
    

    // Аватар пользователя из Telegram, или дефолтное изображение
    const avatar = ref('default_avatar.png');  // Замени на реальный путь к дефолтному изображению
    const level = ref(1);  // Уровень пользователя
    const coinsPerHour = ref(100);  // Количество монет в час

    const { initDataUnsafe } = useWebApp();

    onMounted(async () => {
        // Проверка наличия данных пользователя
        // if (initDataUnsafe?.user && initDataUnsafe.user.id) {
        //     user.value = initDataUnsafe.user;

        //     const data = await $fetch(`http://localhost:8000/get-avatar/${user.id}/`, {
        //     });

        //     if (data) {
        //         avatar.value = data.avatar_url;
        //     }
        // } else {
        //     alert('Ошибка получения данных пользователя');
        // }

        // const user_id=454338166;
        // const datat = await $fetch(`get-avatar/${user_id}/`, {
        // });

        // if (datat) {
        //     avatar.value = data.avatar_url;
        // }

        // // Если уровень передаётся откуда-то
        // level.value = 1;
    });

    async function get_avatar() {
        const user_id = 454338166;
        const data1 = await $fetch(`http://9f74ea0d-0820-418e-9474-aeb6fb4cda2d.tunnel4.com/get-avatar/${user_id}/`, {
        });

        avatar.value=data1.avatar_url;

        // console.log(data1);
    
    }
</script>

<style scoped>
/* Можешь добавить дополнительные стили при необходимости */
</style>
