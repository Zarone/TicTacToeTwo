module.exports = {
  apps: [
    {
      name: 'server',
      script: 'server/build/app.js',
      watch: 'server/src/',
      env: {
        SCORE_PATH: '/opt/tictactoe/scores.json',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: 'h2955974.stratoserver.net',
      ref: 'origin/main',
      repo: 'git@github.com:Zarone/TicTacToeTwo.git',
      path: '/opt/tictactoe',
      'pre-deploy-local': '',
      'post-deploy':
        'yarn install && make build && rm -rf /opt/tictactoe/current/server/static/ && mv /opt/tictactoe/current/client/build/ /opt/tictactoe/current/server/static/ && pm2 reload ecosystem.config.js --env production',
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
