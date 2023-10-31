// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  app: {
    rootId: 'properties-pro'
  },
  runtimeConfig: {
    public: {
      appUrl: '',
      alarm: false
    },
    authSecret: ''
  },
  routeRules: {
    '/api/**': {cors: true}
  },
  css: [
    '@/assets/css/style.sass'
  ],
  tailwindcss: {
    viewer: false
  },
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  elementPlus: {
    icon: false,
    importStyle: 'scss',
    themes: ['dark']
  },
  postcss: {
    plugins: {
      rtlCss: {autoRename: true}
    }
  },
  auth: {
    isEnabled: true,
    globalAppMiddleware: true,
    // @ts-ignore
    addDefaultCallbackUrl: false,
    globalMiddlewareOptions: {
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: false
    }
  },
  devtools: { enabled: true }
})
