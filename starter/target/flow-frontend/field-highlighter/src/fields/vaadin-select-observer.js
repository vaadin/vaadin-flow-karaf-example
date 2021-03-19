/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { FieldObserver } from './vaadin-field-observer.js';

export class SelectObserver extends FieldObserver {
  constructor(select) {
    super(select);

    this.blurWhileOpened = false;
    this.overlay = select._overlayElement;
  }

  addListeners(select) {
    super.addListeners(select);

    select.addEventListener('opened-changed', (event) => {
      // when in phone mode, focus is lost when closing.
      if (select._phone && event.detail.value === false) {
        this.hideOutline(select);
      }
    });
  }

  onFocusIn(event) {
    if (this.overlay.contains(event.relatedTarget)) {
      // focus returns on item select, do nothing.
      return;
    }

    if (!this.component._phone && this.overlay.hasAttribute('closing')) {
      // focus returns on outside click, do nothing.
      return;
    }

    super.onFocusIn(event);
  }

  onFocusOut(event) {
    if (this.overlay.contains(event.relatedTarget)) {
      // do nothing, overlay is opening.
      return;
    }
    super.onFocusOut(event);
  }
}
