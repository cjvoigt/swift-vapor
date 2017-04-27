'use babel';

import SwiftVaporView from './swift-vapor-view';
import VaporCommands from './swift-vapor-commands';
import { CompositeDisposable } from 'atom';

export default {

  commands: null,
  swiftVaporView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.swiftVaporView = new SwiftVaporView(state.swiftVaporViewState);
    this.commands = new VaporCommands();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.swiftVaporView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'swift-vapor:run': () => this.commands.build()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.swiftVaporView.destroy();
  },

  serialize() {
    return {
      swiftVaporViewState: this.swiftVaporView.serialize()
    };
  }
};
