'use babel';

import { BufferedProcess } from 'atom';

export default class VaporCommands {

  constructor() {
    this.exitHandler = this.exitHandler.bind(this);
    this.error = "";
  }

  build() {
    var command = 'vapor';
    var args = ['build']
    var stdout = (output) =>  {
      console.log(output);
    }
    var exit = this.exitHandler;
    var process = new BufferedProcess({command, args, stdout, exit});
  }

  exitHandler(code) {
    console.log("Build exited with code " + code)
    switch(code) {
      case 0:
        atom.notifications.addSuccess("Ran Build Successfully");
        break;
      case 1:
        atom.notifications.addError("Vapor Failed", {
          detail: code
        });
        break;
      default:
        break;
    }
  }

}
