// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: false},
    app: {

        head: {
            title: '奈斯导航WEB站基础版 - 免费AI问答',
            meta: [
                {charset: 'utf-8'},
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                },

            ],
            link: [
                {rel: "icon", href: "/favicon.ico", type: 'image/x-icon'},
            ],

        },
        pageTransition: {name: 'page', mode: 'out-in'}

    },
    runtimeConfig: { // 运行时常量
        normal_url: process.env.VITE_SERVER_NAME,
        public: { // 客户端-服务的都能访问
            // baseUrl: process.env.VITE_SERVER_NAME
        },
    },
    arco: {
        imports: ["Message", "Notification"],
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        'nuxt-lucide-icons',
        'arco-design-nuxt-module',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',

    ],
    css: ['@/assets/css/main.css'],
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    }
})