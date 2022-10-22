module.exports = {
  apps: [
    {
      name: 'server',
      script: 'server/build/app.js',
      watch: 'server/src/',
    },
  ],
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/main',
      repo: 'git@github.com:Zarone/TicTacToeTwo.git',
      path: '/opt/tictactoe',
      'pre-deploy-local': '',
      'post-deploy':
        'yarn install && yarn workspace @tictactoe/server install && yarn workspace @tictactoe/server build && cp -r /opt/tictactoe/source/client/build/* /opt/tictactoe/source/server/static/ && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
    staging: {
      user: '',
      host: '',
      ref: 'origin/main',
      repo: 'git@github.com:Zarone/TicTacToeTwo.git',
      path: '/opt/tictactoe',
      'pre-deploy-local': '',
      'post-deploy':
        'yarn install && yarn workspace @tictactoe/server install && yarn workspace @tictactoe/server build && cp -r /opt/tictactoe/source/client/build/* /opt/tictactoe/source/server/static/ && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
