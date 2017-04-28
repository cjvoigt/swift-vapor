'use babel';

import { BufferedProcess } from 'atom';

export default class VaporCommands {

  build() {
    this.executeVaporCommand('build', [])
    .then((data) => {
      console.log(data);
      atom.notifications.addSuccess("Vapor Build Successful", {
        detail: data
      });
    })
    .catch((data) => {
      console.log(data);
      atom.notifications.addError("Vapor Build Failed", {
        detail: data
      });
    });
  }

  executeVaporCommand(command, options) {
    var paths = atom.project.getPaths();
    return new Promise((resolve, reject) => {
      var message = "";
      var args = [command];
      var stdout = (output) => {
        if (output.includes('[Failed]') ||
            output.includes('[Done]') ||
            output.includes('Error:')) {
          message += output;
        }
      }

      var stderr = (output) => {
        reject(output);
      }

      var exit = (code) => {
        if (code == 0) {
          resolve(this.parseMessage(message));
        } else {
          reject(this.parseMessage(message));
        }
      }

      new BufferedProcess({command: 'vapor', args, options: { cwd: paths[0] }, stdout, stderr, exit});
    });
  }

  parseMessage(message) {
    return message.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGKA]/g, "");
  }
}
