'use babel';

import {SelectListView} from 'atom-space-pen-views';

export default class SwiftVaporSelectDirectoryView extends SelectListView {

  constructor(directories, success, failure) {
    super();
    this.success = success;
    this.failure = failure;
    this.list.addClass('mark-active');
    this.setItems(directories);
    this.focusFilterEditor();
  }

  serialize() {}

  setPanel(panel) {
    this.panel = panel;
  }

  viewForItem(item) {
    return "<li>" + item + "</li>";
  }

  confirmed(item) {
    this.panel.hide();
    console.log(item + " was selected");
    if(this.success) {
      this.success(item);
    }
  }

  cancelled() {
    this.panel.hide();
    console.log("View Was Cancelled");
    if (this.failure) {
      this.failure();
    }
  }
}
