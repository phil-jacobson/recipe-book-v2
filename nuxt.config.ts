// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
  modules: [
    '@nuxt/content', 'nuxt-lodash'
  ],
  //content: {
  //  experimental: {
  //   search: true
  //  }
  //},
  devtools: { enabled: true },
  pages: true    
})
