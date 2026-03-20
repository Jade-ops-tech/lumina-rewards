export default defineEventHandler((event) => {
  return {
    hello: 'world',
    message: 'This is an example API endpoint powered by Nuxt 3.',
    timestamp: new Date().toISOString()
  }
})
