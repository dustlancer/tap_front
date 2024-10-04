// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxt/image', '@pinia/nuxt',],
  // Настройки meta и скриптов в head
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      ],
      script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
      link: [
        { rel: 'preload', href: '/airdrop.png', as: 'image' }
      ],
    },
    baseURL: '/tap_front/', // baseURL: '/<repository>/' tap_front/
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids
  },

  // Включение инструментов разработчика
  devtools: { enabled: true },
  
  // Подключение глобальных стилей
  css: [
    '@/assets/css/main.css',
    'vue-toastification/dist/index.css',
  ],
  
  // Настройки PostCSS с TailwindCSS
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Отключение proxy, так как модуль устарел для Nuxt 3
  // Настройка для API-запросов будет использовать стандартные методы Nuxt 3
  runtimeConfig: {
    public: {
      apiBase: 'https://51ad998baacc50.lhr.life',  // Например: 'http://192.168.1.100:8000' 'http://dustlancer.keenetic.pro:44427', 'https://8f6105dfbcb6b4caadfe532d8560b8ce.serveo.net'
    }
  },
  plugins: [
    '~/plugins/mediaUrl.js'
  ],
})
