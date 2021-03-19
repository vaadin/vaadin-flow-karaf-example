/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { ComponentObserver } from './vaadin-component-observer.js';

export class FieldObserver extends ComponentObserver {
  constructor(field) {
    super(field);

    this.addListeners(field);
  }

  addListeners(field) {
    field.addEventListener('focusin', (event) => this.onFocusIn(event));
    field.addEventListener('focusout', (event) => this.onFocusOut(event));
  }

  onFocusIn(event) {
    const target = this.getFocusTarget(event);
    this.showOutline(target);
  }

  onFocusOut(event) {
    const target = this.getFocusTarget(event);
    this.hideOutline(target);
  }
}
