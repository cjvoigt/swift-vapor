'use babel';

import SwiftVapor from '../lib/swift-vapor';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('SwiftVapor', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('swift-vapor');
  });

  describe('when the swift-vapor:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.swift-vapor')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'swift-vapor:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.swift-vapor')).toExist();

        let swiftVaporElement = workspaceElement.querySelector('.swift-vapor');
        expect(swiftVaporElement).toExist();

        let swiftVaporPanel = atom.workspace.panelForItem(swiftVaporElement);
        expect(swiftVaporPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'swift-vapor:toggle');
        expect(swiftVaporPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.swift-vapor')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'swift-vapor:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let swiftVaporElement = workspaceElement.querySelector('.swift-vapor');
        expect(swiftVaporElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'swift-vapor:toggle');
        expect(swiftVaporElement).not.toBeVisible();
      });
    });
  });
});
