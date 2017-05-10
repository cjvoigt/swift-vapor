'use babel';

import { BufferedProcess } from 'atom';
import SwiftVaporSelectDirectoryView from './swift-vapor-select-directory-view';

export default class VaporCommands {

  constructor() {
    this.panel = null;
  }

  // Commands
  build(path) {
    console.log(path);
    this.executeVaporCommand('build', path, [])
    .then((data) => {
      console.log(data);
      atom.notifications.addSuccess("Vapor Build Successful", { detail: data });
    })
    .catch((data) => {
      console.log(data);
      atom.notifications.addError("Vapor Build Failed", { detail: data });
    });
  }

  // Main
  start(command) {
    var view = new SwiftVaporSelectDirectoryView(atom.project.getPaths(), this.getSuccessFunction(command).bind(this), this.viewCancel.bind(this));
    var panel = atom.workspace.addModalPanel({
      item: view
    });
    view.setPanel(panel);
  }

  executeVaporCommand(command, path, options) {
    return new Promise((resolve, reject) => {
      var message = "";
      var args = [command];
      var stdout = (output) => {
        if (output.includes('Error:')) {
          message += output;
          reject(this.parseMessage(message));
        } else if (output.includes('[Failed]') || output.includes('[Done]')){
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

      new BufferedProcess({command: 'vapor', args, options: { cwd: path }, stdout, stderr, exit});
    });
  }

  // Helper Functions
  getSuccessFunction(command) {
    switch (command) {
      case 'build':
        return this.build;
      default:
        return this.build;
    }
  }

  viewCancel() {
    //TODO: Figure out what to do here
  }

  parseMessage(message) {
    return message.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGKA]/g, "");
  }
}
