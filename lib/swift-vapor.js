'use babel';

import SwiftVaporSelectDirectoryView from './swift-vapor-select-directory-view';
import VaporCommands from './swift-vapor-commands';
import { CompositeDisposable } from 'atom';

export default {

  commands: null,
  selectDirectoryView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.selectDirectoryView = new SwiftVaporSelectDirectoryView(state.swiftVaporViewState);
    this.commands = new VaporCommands();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command to vapor build
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'swift-vapor:build': () => this.commands.start('build')
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.selectDirectoryView.destroy();
  },

  serialize() {
    return {
      swiftVaporViewState: this.selectDirectoryView.serialize()
    };
  }
};
