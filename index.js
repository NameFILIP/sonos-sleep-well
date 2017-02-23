const sonos = require('sonos');

// Note: sonos.search((device) => {}) is an alternative, but it gives a Warning:
// Possible EventEmitter memory leak detected. 11 timeout listeners added.
// Use emitter.setMaxListeners() to increase limit
const host = '10.0.0.31';
const port = 1400;

const threshold = 50;


const sexySongUri = 'https://ia601506.us.archive.org/16/items/SexySaxMan/SexySaxMan.mp3';

const Sonos = new sonos.Sonos(host, port);

console.log(`Watching that Sonos volume is below ${threshold}`);
global.setInterval(() => {
  Sonos.getVolume((error1, volume) => {
    if (error1) {
      console.error(error1);
      return;
    }
    if (volume > threshold) {
      console.log(`The volume is above the threshold: ${volume}`);
      Sonos.setVolume(threshold, (error2) => {
        if (error2) {
          console.error(error2);
          return;
        }
        console.log(`Set volume to ${threshold}`);
        Sonos.play(sexySongUri, (error3, playing) => {
          if (error3) {
            console.error(error3);
            return;
          }
          console.log(`Playing ${playing}`);
        });
      });
    }
  });
}, 10000);
