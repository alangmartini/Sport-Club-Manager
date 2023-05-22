module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/server.ts',
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/database/models',
    'src/interfaces',
    'src/types'
  ],
  include: ['src/**/*.ts']
};
