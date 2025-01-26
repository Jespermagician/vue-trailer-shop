// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
})



// // https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
//   modules: ['@nuxtjs/tailwindcss'],
//   telemetry: false,
//   devtools: { enabled: true },
//   // routeRules: {
//   //   '/': { ssr: true },
//   //   '/profile': { ssr: false },
//   //   '/products': { ssr: true },
//   // },
//   app: {
//     head: {
//       title: 'Nuxt Auth0',
//       link: [
//         { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
//       ],
//     },
//   },
//   appConfig: {
//     auth: {
//       domain: process.env.AUTH0_DOMAIN,
//       clientId: process.env.AUTH0_CLIENT_ID,
//       audience: process.env.AUTH0_AUDIENCE,
//       redirectUri: process.env.AUTH0_REDIRECT_URI,
//     },
//   },
// });