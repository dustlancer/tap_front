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
        <!-- <div class="flex flex-col items-start">
            <span class="font-thin text-sm">Монет в час</span>
            <div class="flex items-center space-x-1 font-bold">
                <img src="/coin.png" alt="Coin Icon" class="w-6 h-6" />
                <span>{{ coinsPerHour }}</span>
            </div>
        </div> -->

        <div class="flex flex-col items-start">
            <span class="font-thin text-sm">Баланс</span>
            <div class="flex items-center space-x-1 font-bold w-7">
                <img src="/coin.png" alt="Coin Icon" class="w-6 h-6" />
                <span>{{ balance }}</span>
            </div>
        </div>

        <!-- Кнопка Community -->
        <button class="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
        Бейджи
        </button>
    </div>
</template>

<script setup>
    // import { useUserStore } from '~/stores/userStore'
    import { ref, onMounted } from 'vue';
    import { useWebApp, useWebAppPopup } from 'vue-tg';
    import { useUserStore } from '~/stores/user'
    import { useClickStore } from '~/stores/click';
    
    
    const user = useUserStore();
    // Аватар пользователя из Telegram, или дефолтное изображение
    const avatar = ref('default_avatar.png');  // Замени на реальный путь к дефолтному изображению
    const level = ref(0);  // Уровень пользователя
    const coinsPerHour = ref(0);  // Количество монет в час
    const balance = computed(() => user.local_coins);

    // const { showAlert } = useWebAppPopup();
    // const { initDataUnsafe } = useWebApp();

    function init_topbar() {
        if (user.avatar_url) { avatar.value = user.avatar_url; }
        level.value = user.level.level_number;
        coinsPerHour.value = user.mining_speed;
        balance.value = user.coins;
        v.value = user.user_id;
    };

    async function init_user() {
        // const userData = initDataUnsafe?.user;
        // showAlert(JSON.stringify(userData));

        const d = {
            "id": 454338166,
            "first_name": "Андрей",
            "last_name": "",
            "username": "paenny",
            "language_code": "ru",
            "allows_write_to_pm": true
        };

        try {
            const response = await fetch('http://dustlancer.keenetic.pro:44427/telegram/init/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(d)
            });

            if (response.ok) {
                const data = await response.json();
                alert('ok');
                // showAlert(data.avatar_url);
                // avatar.value=data.avatar_url;
                user.setUserData(data);
                // userStore.setAvatarUrl(data.avatar_url);
                console.log('User data sent successfully:', data);
            } else {
                console.error('Failed to send user data:', response.status);
            }
        } catch (error) {
            // showAlert(`e:${error}`);
            alert(error);
            console.error('Error:', error);
        }
    }

    onMounted(async () => {
        // init_user();
        init_topbar();
    });


</script>

<style scoped>
/* Можешь добавить дополнительные стили при необходимости */
</style>
