const path = require('path')

module.exports = {
  apps: [
    {
      name: 'lumina-rewards',
      port: 3000,
      exec_mode: 'fork',
      instances: 1, // Using 1 instance because SQLite does not natively support multi-process concurrent writes well
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 3000,
        NITRO_HOST: '0.0.0.0',
        DATABASE_URL: 'file:' + path.resolve(__dirname, 'prisma/dev.db')
      }
    }
  ]
}
