const sonos = require('sonos');

const threshold = 50;
const sexySongUri = 'https://ia601506.us.archive.org/16/items/SexySaxMan/SexySaxMan.mp3';

sonos.search((device) => {
  console.log(`Watching that device volume is below ${threshold}`);
  global.setInterval(
    () => {
      device.getVolume((error1, volume) => {
        if (error1) {
          console.error(error1);
          return;
        }
        if (volume > threshold) {
          console.log(`The volume is above the threshold: ${volume}`);
          device.setVolume(threshold, (error2) => {
            if (error2) {
              console.error(error2);
              return;
            }
            console.log(`Set volume to ${threshold}`);
            device.play(sexySongUri, (error3, playing) => {
              if (error3) {
                console.error(error3);
                return;
              }
              console.log(`Playing ${playing}`);
            });
          });
        }
      });
    },
    10000,
  );
});
