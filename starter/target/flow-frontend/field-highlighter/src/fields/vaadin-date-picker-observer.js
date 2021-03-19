/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { ComponentObserver } from './vaadin-component-observer.js';

export class DatePickerObserver extends ComponentObserver {
  constructor(datePicker) {
    super(datePicker);

    this.datePicker = datePicker;
    this.fullscreenFocus = false;
    this.blurWhileOpened = false;

    this.addListeners(datePicker);
  }

  addListeners(datePicker) {
    this.overlay = datePicker.$.overlay;

    // Fullscreen date picker calls blur() to avoid focusing of the input:
    // 1. first time when focus event is fired (before opening the overlay),
    // 2. second time after the overlay is open, see "_onOverlayOpened".
    // Here we set the flag to ignore related focusout events and then to
    // mark date picker as being edited by user (to show field highlight).
    // We have to use capture phase in order to catch this event early.
    datePicker.addEventListener('focus', (event) => this.onFocus(event), true);

    datePicker.addEventListener('opened-changed', (event) => this.onOpenedChanged(event));

    this.overlay.addEventListener('focusout', (event) => this.onOverlayFocusOut(event));

    datePicker.addEventListener('focusin', (event) => this.onFocusIn(event));

    datePicker.addEventListener('focusout', (event) => this.onFocusOut(event));
  }

  onFocus(event) {
    const datePicker = this.datePicker;
    if (datePicker._fullscreen && event.relatedTarget !== this.overlay) {
      this.fullscreenFocus = true;

      if (datePicker.opened) {
        this.fullscreenFocus = false;
        this.showOutline(datePicker);
      }
    }
  }

  onFocusIn(event) {
    if (event.relatedTarget === this.overlay) {
      // focus returns from the overlay, do nothing.
      return;
    }

    if (this.blurWhileOpened) {
      this.blurWhileOpened = false;
      // focus returns from outside the browser tab, ignore.
      return;
    }

    this.showOutline(this.datePicker);
  }

  onFocusOut(event) {
    if (this.fullscreenFocus || event.relatedTarget === this.overlay) {
      // do nothing, overlay is opening.
    } else if (!this.datePicker.opened) {
      // field blur when closed.
      this.hideOutline(this.datePicker);
    } else {
      // Focus moves away while still opened, e.g. outside the browser.
      // Mark the date picker as blurred and wait for opened-changed.
      this.blurWhileOpened = true;
    }
  }

  onOverlayFocusOut(event) {
    if (event.relatedTarget !== this.datePicker) {
      // Mark as blurred to wait for opened-changed.
      this.blurWhileOpened = true;
    }
  }

  onOpenedChanged(event) {
    // closing after previously moving focus away.
    if (event.detail.value === false && this.blurWhileOpened) {
      this.blurWhileOpened = false;
      this.hideOutline(this.datePicker);
      return;
    }
  }
}
