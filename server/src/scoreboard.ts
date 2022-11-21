import * as fs from 'fs';

let blueTeam = 0;
let redTeam = 0;
let timer: NodeJS.Timeout;
let scorePath = process.env.SCORE_PATH || './scores.json';
export default {
  incrementRed() {
    redTeam++;
    this.persist();
  },

  incrementBlue() {
    blueTeam++;
    this.persist();
  },

  persist() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fs.writeFile(
        scorePath,
        JSON.stringify({
          red: redTeam,
          blue: blueTeam,
        }),
        () => {
          console.info('Persisted player scores');
        }
      );
    }, 300);
  },

  scores() {
    return {
      red: redTeam,
      blue: blueTeam,
    };
  },
};
